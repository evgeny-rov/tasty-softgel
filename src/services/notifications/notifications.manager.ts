import AsyncStorage from '@react-native-community/async-storage';
import {ReceivedNotification} from 'react-native-push-notification';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {Persistor} from 'redux-persist';
import {Store} from 'redux';

import {AppStateType} from 'src/types';
import {
  TypedAddAssignmentAction,
  TypedRemoveAssignmentAction,
} from 'src/redux/entities/assignments/assignments.actionTypes';
import {TypedConfirmConsumptionAction} from 'src/redux/entities/consumptions/consumptions.actionTypes';
import {TypedUpdateMedicineAction} from 'src/redux/entities/medicines/medicines.actionTypes';
import * as Notifications from './notifications.api';
import getAvailableDateFromHour from 'src/utils/getAvailableDateFromHour';
import {
  confirmConsumption,
  consumptionsRefresh,
} from '../../redux/entities/consumptions/consumptions.actions';
import {
  getAssignmentsByHour,
  getAssignmentsHoursByMedicineId,
  getAssignmentsWithMedicines,
  getMedicinesSuppliesByHour,
} from 'src/redux/entities/assignments/assignments.selectors';
import hourToTimeString from 'src/utils/hourToTimeString';

const channelsData = {
  ids: ['daily_notifications'],
  byId: {
    daily_notifications: {
      channelId: 'daily_notifications',
      channelName: 'Daily Notifications',
      importance: 4,
      vibrate: true,
    },
  },
};

const dailyReminderBase = {
  channelId: channelsData.byId.daily_notifications.channelId,
  title: 'Напоминание о приеме',
  actions: ['Я не забыл'],
  tag: 'reminder',
  group: 'daily-reminder',
};

const handleNotificationAction = async (
  notification: ReceivedNotification,
  store: Store<AppStateType & PersistPartial, any>,
  persistor: Persistor,
) => {
  await AsyncStorage.getAllKeys(() => {
    const notificationHour = Number(notification.id);
    const state = store.getState();
    const {lastConfirmationAt} = state.consumptions;
    const medicines =
      getAssignmentsWithMedicines(state)[notificationHour] || [];

    store.dispatch(consumptionsRefresh({lastConfirmationAt}));

    store.dispatch(confirmConsumption(notificationHour, medicines));

    persistor.flush();
  });
};

export const initNotificationsManager = (
  store: Store<AppStateType & PersistPartial, any>,
  persistor: Persistor,
) => {
  Notifications.configure({
    channelsConfigs: Object.values(channelsData.byId),
    onNotificationActions: (notification: ReceivedNotification) =>
      handleNotificationAction(notification, store, persistor),
  });
};

const scheduleDailyNotification = (scheduledDate: Date, message: string) => {
  Notifications.scheduleNotification({
    ...dailyReminderBase,
    date: scheduledDate,
    id: scheduledDate.getHours(),
    subText: hourToTimeString(scheduledDate.getHours()),
    message,
    invokeApp: false,
    autoCancel: false,
    repeatType: 'day',
  });
};

const showSupplyDepletionNotification = (title: string, message: string) => {
  Notifications.showNotification({
    channelId: channelsData.byId.daily_notifications.channelId,
    title,
    tag: 'depletion',
    group: 'depletion',
    message,
  });
};

const createReminder = (assignedHour: number) => {
  const scheduledDate = getAvailableDateFromHour(assignedHour);
  scheduleDailyNotification(scheduledDate, 'Не забудь выпить лекарства!');
};

export const handleNewAssignment = (
  payload: TypedAddAssignmentAction['payload'],
  state: AppStateType,
) => {
  const shouldCreateReminder =
    state.medicines.byId[payload.medicineId].count > 0;
  if (shouldCreateReminder) createReminder(payload.hour);
};

export const handleRemoveAssignment = (
  payload: TypedRemoveAssignmentAction['payload'],
  state: AppStateType,
) => {
  const hasRemainingAssignments = payload.hour in getAssignmentsByHour(state);

  if (hasRemainingAssignments) {
    return;
  } else {
    Notifications.cancelNotification(dailyReminderBase.tag, payload.hour);
  }
};

export const handleUpdateMedicine = (
  payload: TypedUpdateMedicineAction['payload'],
  state: AppStateType,
) => {
  const {id} = payload;
  const assignedHours = getAssignmentsHoursByMedicineId(state)[id];
  const medicinesSupplies = getMedicinesSuppliesByHour(state);

  assignedHours.forEach((hour) => {
    if (medicinesSupplies[hour].total > 0) {
      createReminder(hour);
    } else {
      Notifications.cancelNotification(dailyReminderBase.tag, hour);
    }
  });
};

export const handleConfirmationAction = (
  payload: TypedConfirmConsumptionAction['payload'],
  state: AppStateType,
) => {
  const {hour: assignedHour} = payload;
  const medicinesSupplies = getMedicinesSuppliesByHour(state);

  if (assignedHour in medicinesSupplies) {
    const {
      total: totalSupply,
      depletes_soon,
      almost_depleted,
    } = medicinesSupplies[assignedHour];

    depletes_soon.length > 0 &&
      showSupplyDepletionNotification(
        'Лекарства заканчиваются',
        'Осталось по 5шт. ' + depletes_soon.map(({name}) => name).join(' '),
      );

    almost_depleted.length > 0 &&
      showSupplyDepletionNotification(
        'Лекарства заканчиваются',
        'Осталось по 1шт. ' + almost_depleted.map(({name}) => name).join(' '),
      );

    Notifications.cancelNotification(dailyReminderBase.tag, assignedHour);

    totalSupply > 0 && createReminder(assignedHour);
  } else {
    return;
  }
};
