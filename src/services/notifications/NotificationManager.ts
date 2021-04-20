import AsyncStorage from '@react-native-community/async-storage';
import {Store} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {PersistPartial} from 'redux-persist/es/persistReducer';
import {
  confirmConsumption,
  systemRevive,
} from 'src/redux/entities/system/system.actions';
import {AppStateType} from 'src/types';
import getAvailableDateFromHour from 'src/utils/getAvailableDateFromHour';
import {channels} from './configs';

export const getScheduledNotifications = (callback: any) => {
  PushNotification.getScheduledLocalNotifications(callback);
};

export const cancelNotificationByHour = (hour: number) => {
  PushNotification.clearLocalNotification('reminder', hour);
  PushNotification.cancelLocalNotifications({hour});
};

export const cancelAllNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const scheduleNotification = (scheduledDate: Date) => {
  PushNotification.localNotificationSchedule({
    channelId: channels.byId.daily_notifications.channelId,
    id: scheduledDate.getHours(),
    tag: 'reminder',
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

export const setNotification = (
  hour: number,
  prevState: AppStateType,
  nextState: AppStateType,
) => {
  const alreadyExists = prevState.reminders.allHours.includes(hour);
  if (alreadyExists) {
    return;
  }
  scheduleNotification(getAvailableDateFromHour(hour));
};

export const unsetNotification = (
  hour: number,
  prevState: AppStateType,
  nextState: AppStateType,
) => {
  const shouldExist = nextState.reminders.allHours.includes(hour);
  if (shouldExist) {
    return;
  }
  cancelNotificationByHour(hour);
};

export const setNextNotification = (
  hour: number,
  prevState: AppStateType,
  nextState: AppStateType,
) => {
  cancelNotificationByHour(hour);

  const remainingAmounts = nextState.reminders.byHour[hour].medicinesIds.reduce(
    (acc, medId) => acc + nextState.medicines.byId[medId].currentAmount,
    0,
  );

  console.log('calced amounts', remainingAmounts);

  if (remainingAmounts > 0) {
    scheduleNotification(getAvailableDateFromHour(hour));
  }
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

        store.dispatch(confirmConsumption(Number(notification.id)));
      });
    },
    requestPermissions: Platform.OS === 'ios',
  });

  configureChannels();
};

// export const fireTestNotif = (id: number) => {
//   // const scheduledDate = new Date(Date.now() + 2000);
//   const hour = 10;

//   PushNotification.localNotification({
//     userInfo: {hour, type: 'test'},
//     tag: hour.toString(),
//     id,
//     channelId: channels.byId.test_channel.channelId,
//     actions: ['poop', 'not poop'],
//     invokeApp: false,
//     title: 'Напоминание о приеме',
//     message: 'Не забудьте выпить лекарства!',
//     group: 'daily-reminder',
//   });
// };

export const fireTestScheduledNotif = (id: number) => {
  const hour = 11;

  PushNotification.localNotificationSchedule({
    date: new Date(Date.now() + 5000),
    tag: hour.toString(),
    id,
    userInfo: {hour, type: 'test'},
    channelId: channels.byId.test_channel.channelId,
    actions: ['poop', 'not poop'],
    invokeApp: false,
    title: 'Напоминание о приеме',
    message: 'Не забудьте выпить лекарства!',
    group: 'daily-reminder',
  });
};
