import AsyncStorage from '@react-native-community/async-storage';
import {throttle} from 'lodash';
import {ReceivedNotification} from 'react-native-push-notification';
import {Store} from 'redux';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {
  confirmConsumption,
  systemRevive,
} from 'src/redux/entities/system/system.actions';
import {AppStateType} from 'src/types';
import getAvailableDateFromHour from 'src/utils/getAvailableDateFromHour';
import * as Notifications from './notifications.api';

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

const dailyReminderData = {
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
    const state = store.getState();
    const hour = Number(notification.id);
    const assignedMedicinesIds = state.reminders.byHour[hour].medicinesIds;

    store.dispatch(
      systemRevive({
        lastConsumptionConfirmationAt:
          state.system.lastConsumptionConfirmationAt,
      }),
    );

    if (store.getState().system.consumptionConfirmedHours.includes(hour)) {
      return;
    }

    store.dispatch(confirmConsumption(hour, assignedMedicinesIds));
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
    ...dailyReminderData,
    date: scheduledDate,
    id: scheduledDate.getHours(),
    when: scheduledDate.getTime(),
    showWhen: true,
    message,
    invokeApp: false,
    autoCancel: false,
    repeatType: 'day',
  });
};

export const handleAssignReminder = (hour: number, state: AppStateType) => {
  const scheduledDate = getAvailableDateFromHour(hour);
  const assignedMedicinesNames = state.reminders.byHour[hour].medicinesIds
    .map((medId) => state.medicines.byId[medId].name)
    .join(', ');

  scheduleDailyReminder(scheduledDate, assignedMedicinesNames);
};

export const handleUnassignReminder = (hour: number, state: AppStateType) => {
  const shouldBeCancelled = !state.reminders.allHours.includes(hour);
  if (shouldBeCancelled) {
    Notifications.cancelNotification(dailyReminderData.tag, hour);
  } else {
    const scheduledDate = getAvailableDateFromHour(hour);
    const assignedMedicinesNames = state.reminders.byHour[hour].medicinesIds
      .map((medId) => state.medicines.byId[medId].name)
      .join(', ');

    scheduleDailyReminder(scheduledDate, assignedMedicinesNames);
  }
};

export const handleNextScheduledReminder = (
  hour: number,
  state: AppStateType,
) => {
  Notifications.cancelNotification(dailyReminderData.tag, hour);

  const medicinesData = state.reminders.byHour[hour].medicinesIds.reduce(
    (acc, medId) => {
      const medicinesItem = state.medicines.byId[medId];

      return {
        ...acc,
        totalRemainingAmount:
          acc.totalRemainingAmount + medicinesItem.currentAmount,
        items: [
          ...acc.items,
          {[medicinesItem.name]: medicinesItem.currentAmount},
        ],
        names: [...acc.names, medicinesItem.name],
      };
    },
    {totalRemainingAmount: 0, items: [] as Object[], names: [] as string[]},
  );

  if (medicinesData.totalRemainingAmount > 0) {
    const scheduledDate = getAvailableDateFromHour(hour);
    scheduleDailyReminder(scheduledDate, medicinesData.names.join(', '));
  }
};
