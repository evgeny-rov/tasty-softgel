import AsyncStorage from '@react-native-community/async-storage';
import {ReceivedNotification} from 'react-native-push-notification';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {filter} from 'lodash';
import {Store} from 'redux';

import {AppStateType} from 'src/types';
import getAvailableDateFromHour from 'src/utils/getAvailableDateFromHour';
import {
  confirmConsumption,
  consumptionsRefresh,
} from '../../redux/entities/consumptions/consumptions.actions';
import * as Notifications from './notifications.api';
import hourToTimeString from 'src/utils/hourToTimeString';

const channelsData = {
  ids: ['daily_notifications', 'test_channel'],
  byId: {
    daily_notifications: {
      channelId: 'daily_notifications',
      channelName: 'Daily Notifications',
      importance: 4,
      vibrate: true,
    },
    test_channel: {
      channelId: 'test_channel',
      channelName: 'Test Channel',
      importance: 4,
      vibrate: true,
    },
  },
};

const dailyReminderBase = {
  channelId: channelsData.byId.daily_notifications.channelId,
  title: 'Напоминание о приеме лекарств',
  actions: ['Я не забыл'],
  tag: 'reminder',
  group: 'daily-reminder',
};

const handleNotificationAction = async (
  notification: ReceivedNotification,
  store: Store<AppStateType & PersistPartial, any>,
) => {
  await AsyncStorage.getAllKeys(() => {
    const assignedNotificationsHour = Number(notification.id);
    const state = store.getState();
    const {lastConfirmationAt} = state.consumptions;
    const assignmentsByAssignedHour = filter(
      state.assignments.byId,
      ({hour: assignedHour}) => assignedHour === assignedNotificationsHour,
    );

    const medicinesIds = assignmentsByAssignedHour.map(
      ({medicineId}) => medicineId,
    );

    store.dispatch(consumptionsRefresh({lastConfirmationAt}));

    store.dispatch(confirmConsumption(assignedNotificationsHour, medicinesIds));
  });
};

export const initNotificationsManager = (
  store: Store<AppStateType & PersistPartial, any>,
) => {
  Notifications.configure({
    channelsConfigs: Object.values(channelsData.byId),
    onNotificationActions: (notification: ReceivedNotification) =>
      handleNotificationAction(notification, store),
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

export const handleAddReminder = (selectedHour: number) => {
  const scheduledDate = getAvailableDateFromHour(selectedHour);
  scheduleDailyReminder(scheduledDate, 'Не забудь выпить лекарства!');
};

export const handleRemoveReminder = (
  selectedHour: number,
  state: AppStateType,
) => {
  const remainingReminders = filter(
    state.assignments.byId,
    ({hour: assignmentHour}) => assignmentHour === selectedHour,
  );

  const reminderShouldBeCancelled = remainingReminders.length < 1;

  if (reminderShouldBeCancelled) {
    Notifications.cancelNotification(dailyReminderBase.tag, selectedHour);
  }
};

export const handleRescheduleReminder = (
  confirmationHour: number,
  state: AppStateType,
) => {
  const assignedMedicines = filter(
    state.assignments.byId,
    ({hour: assignmentHour}) => assignmentHour === confirmationHour,
  );

  const totalMedicinesCount = assignedMedicines.reduce((acc, {medicineId}) => {
    return acc + state.medicines.byId[medicineId].count;
  }, 0);

  Notifications.cancelNotification(dailyReminderBase.tag, confirmationHour);

  totalMedicinesCount > 0 && handleAddReminder(confirmationHour);
};
