import AsyncStorage from '@react-native-community/async-storage';
import {ReceivedNotification} from 'react-native-push-notification';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {Persistor} from 'redux-persist';
import {has} from 'lodash';
import {Store} from 'redux';

import {AppStateType} from 'src/types';
import * as Notifications from './notifications.api';
import getAvailableDateFromHour from 'src/utils/getAvailableDateFromHour';
import {
  confirmConsumption,
  consumptionsRefresh,
} from '../../redux/entities/consumptions/consumptions.actions';
import {
  getAssignmentsByHour,
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

const scheduleDailyReminder = (scheduledDate: Date, message: string) => {
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

export const handleAddReminder = (selectedHour: number) => {
  const scheduledDate = getAvailableDateFromHour(selectedHour);
  scheduleDailyReminder(scheduledDate, 'Не забудь выпить лекарства!');
};

export const handleRemoveReminder = (
  selectedHour: number,
  state: AppStateType,
) => {
  const hasRemainingAssignments = selectedHour in getAssignmentsByHour(state);

  if (!hasRemainingAssignments) {
    Notifications.cancelNotification(dailyReminderBase.tag, selectedHour);
  }
};

export const handleConfirmationAction = (
  selectedHour: number,
  state: AppStateType,
) => {
  const supplies = getMedicinesSuppliesByHour(state);

  if (!has(supplies, selectedHour)) {
    return;
  } else {
    const {total: totalSupply, depletes_soon, almost_depleted} = supplies[
      selectedHour
    ];

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

    Notifications.cancelNotification(dailyReminderBase.tag, selectedHour);

    totalSupply > 0 && handleAddReminder(selectedHour);
  }
};
