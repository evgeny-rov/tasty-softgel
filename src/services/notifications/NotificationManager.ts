import AsyncStorage from '@react-native-community/async-storage';
import {nanoid, Store} from '@reduxjs/toolkit';
import {AppState, Platform} from 'react-native';
import PushNotification, {
  ReceivedNotification,
} from 'react-native-push-notification';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {updateMedicinesAmounts} from 'src/redux/entities/medicines/medicines.actions';
import {
  confirmConsumption,
  systemRevive,
} from 'src/redux/entities/system/system.actions';
import {notificationAction, store} from 'src/redux/store';
import {AppStateType} from 'src/types';
import hourToTimeString from 'src/utils/hourToTimeString';

const channels = {
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
} as const;

const createDate = (hour: number) => {
  const currentDate = new Date();
  const newDate = new Date();
  newDate.setHours(hour, 0, 0, 0);

  if (currentDate.getTime() >= newDate.getTime()) {
    newDate.setDate(newDate.getDate() + 1);
  }

  return newDate;
};

export const getScheduledNotifications = (callback: any) => {
  PushNotification.getScheduledLocalNotifications(callback);
};

export const cancelNotifications = (details: {[prop: string]: string}) => {
  PushNotification.cancelLocalNotifications(details);
};

export const cancelAllNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const scheduleNotification = (hour: number) => {
  const scheduledDate = createDate(hour);

  PushNotification.localNotificationSchedule({
    userInfo: {id: nanoid(), hour, type: 'daily-reminder'},
    channelId: channels.byId.daily_notifications.channelId,
    showWhen: true,
    when: scheduledDate.getTime(),
    date: scheduledDate,
    actions: ['poop'],
    title: 'Напоминание о приеме',
    message: 'Не забудьте выпить лекарства!',
    group: 'daily-reminder',
    invokeApp: false,
    vibrate: true,
    vibration: 500,
  });
};

export const updateDailyNotifications = (hours: number[]) => {
  PushNotification.getScheduledLocalNotifications(console.log);
  cancelNotifications({type: 'daily-reminder'});
  hours.forEach((hour) => scheduleDailyNotification(hour));
};

const configureChannels = () => {
  PushNotification.getChannels((currentChannels) => {
    const channelsAlreadyExist = channels.ids.every((id) =>
      currentChannels.includes(id),
    );

    if (channelsAlreadyExist) {
      return;
    }

    channels.ids.forEach((id) =>
      PushNotification.createChannel(channels.byId[id], () => null),
    );
  });
};

export const setNotification = (
  hour: number,
  prevState: AppStateType,
  nextState: AppStateType,
) => {
  const alreadyExists = prevState.reminders.allHours.includes(hour);
  console.log('not should be set', hour, alreadyExists);
  if (alreadyExists) {
    return;
  }
  scheduleNotification(hour);
};

export const unsetNotification = (
  hour: number,
  prevState: AppStateType,
  nextState: AppStateType,
) => {
  const stillExists = nextState.reminders.allHours.includes(hour);
  if (stillExists) {
    return;
  }
  cancelNotifications({hour: hour.toString()});
};

export const setNextNotification = (
  hour: number,
  prevState: AppStateType,
  nextState: AppStateType,
) => {
  cancelNotifications({hour: hour.toString()});

  const remainingAmounts = nextState.reminders.byHour[hour].medicinesIds.reduce(
    (acc, medId) => acc + nextState.medicines.byId[medId].currentAmount,
    0,
  );

  if (remainingAmounts > 0) {
    scheduleNotification(hour);
  }
};

export const initNotifications = (
  store: Store<AppStateType & PersistPartial, any>,
) => {
  PushNotification.configure({
    // onRegister: (token) => console.log('notif registration, token:', token),
    // onNotification: (notification) => {
    //   console.log('onNotification event');
    //   // store.dispatch(updatePickerValue({value: Math.floor(Math.random() * 23)}));
    // },
    onAction: async (notification) => {
      await AsyncStorage.getAllKeys((err, keys) => {
        const state = store.getState();
        console.log('on action current state', state);
        store.dispatch(
          systemRevive({
            lastConsumptionConfirmationAt:
              state.system.lastConsumptionConfirmationAt,
          }),
        );

        const notificationData = (notification.userInfo as unknown) as string;
        const notificationDataJSON = JSON.parse(notificationData);

        store.dispatch(confirmConsumption(notificationDataJSON.hour));
      });
    },
    requestPermissions: Platform.OS === 'ios',
  });

  configureChannels();
};

export const fireScheduledTestNotification = () => {
  const scheduledDate = new Date(Date.now() + 5000);
  const hour = 10;

  PushNotification.localNotificationSchedule({
    userInfo: {id: nanoid(), hour, type: 'test'},
    channelId: channels.byId.test_channel.channelId,
    subText: hourToTimeString(hour),
    date: scheduledDate,
    actions: ['poop', 'not poop'],
    invokeApp: false,
    title: 'Напоминание о приеме',
    message: 'Не забудьте выпить лекарства!',
    group: 'daily-reminder',
  });
};
