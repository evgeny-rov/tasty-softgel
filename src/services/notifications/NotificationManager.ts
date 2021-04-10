import {nanoid} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import { actionCreator, persistor, store } from 'src/redux/store';
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

export const scheduleDailyNotification = (hour: number) => {
  const scheduledDate = createDate(hour);

  PushNotification.localNotificationSchedule({
    userInfo: {id: nanoid(), hour, type: 'daily-reminder'},
    channelId: channels.byId.daily_notifications.channelId,
    subText: hourToTimeString(hour),
    date: scheduledDate,
    title: 'Напоминание о приеме',
    message: 'Не забудьте выпить лекарства!',
    group: 'daily-reminder',
    repeatType: 'day',
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

export const fireScheduledTestNotification = () => {
  const scheduledDate = new Date(Date.now() + 5000);
  const hour = 10;

  PushNotification.localNotificationSchedule({
    userInfo: {id: nanoid(), hour, type: 'test'},
    channelId: channels.byId.test_channel.channelId,
    subText: hourToTimeString(hour),
    date: scheduledDate,
    actions: ['poop'],
    invokeApp: false,
    title: 'Напоминание о приеме',
    message: 'Не забудьте выпить лекарства!',
    group: 'daily-reminder',
  });
};

export const fireTestNotification = () => {
  PushNotification.localNotification({
    userInfo: {id: nanoid(), type: 'test'},
    channelId: channels.byId.test_channel.channelId,
    title: 'TEST!',
    message: 'Это тестовое оповещение',
    vibrate: true,
    vibration: 500,
  });
};

PushNotification.configure({
  // onRegister: (token) => console.log('notif registration, token:', token),
  // onNotification: (notification) => {
  //   console.log('onNotification event');
  //   // store.dispatch(updatePickerValue({value: Math.floor(Math.random() * 23)}));
  // },
  onAction: actionCreator,
  requestPermissions: Platform.OS === 'ios',
});

configureChannels();

PushNotification.removeAllDeliveredNotifications();