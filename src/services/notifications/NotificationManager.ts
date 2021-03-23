import {nanoid} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

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

export const cancelNotification = (id: string) => {
  PushNotification.cancelLocalNotifications({id});
};

export const cancelAllNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const scheduleDailyNotification = (hour: number) => {
  const scheduledDate = createDate(hour);

  PushNotification.localNotificationSchedule({
    userInfo: {id: nanoid(), hour},
    channelId: 'default-channel-id',
    date: scheduledDate,
    title: 'Напоминание о приеме',
    message: 'Не забудь выпить лекарства!',
    repeatType: 'day',
    vibrate: true,
    vibration: 500,
  });
};

export const updateNotifications = (hours: number[]) => {
  cancelAllNotifications();
  hours.forEach((hour) => scheduleDailyNotification(hour));
};

PushNotification.configure({
  onRegister: (token) => console.log('notif registration, token:', token),
  onNotification: (notification) => null,
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.setApplicationIconBadgeNumber(0);

PushNotification.createChannel(
  {
    channelId: 'default-channel-id',
    channelName: 'default channel',
    importance: 4,
    vibrate: true,
  },
  () => console.log('new channel'),
);
