import * as NotificationsAPI from '../general/api';
import {HOURS_AS_TIME_STRING} from '@constants/';
import groupMedicationsBySupply from '@utils/groupMedicationsBySupply';
import getAvailableDateFromHour from '@utils/getAvailableDateFromHour';
import {scheduledDailyMedicationsRefreshThunk} from 'src/redux/slices/scheduled_medications/actions';
import {confirmConsumptionThunk} from 'src/redux/slices/medications/actions';
import {channelsData} from './channels';

import type {Medication} from 'src/types';
import type {ReceivedNotification} from 'react-native-push-notification';
import type {AppDispatch, RootState} from 'src/redux/store';
import type {Persistor} from 'redux-persist';

type NotificationsParams = {
  store: {
    getState: () => RootState;
    dispatch: AppDispatch;
  };
  persistor: Persistor;
  persistorLoadedListener: (persistor: Persistor) => Promise<unknown>;
};

interface onNotification extends NotificationsParams {
  notification: ReceivedNotification;
}

const notificationsInProcessCache = new Set();

const dailyReminderBaseParams = {
  channelId: channelsData.byId.daily_notifications.channelId,
  vibration: 2000,
  title: 'Напоминание о приеме',
  actions: ['Я не забыл'],
  tag: 'reminder',
};

export const scheduleDailyNotification = (
  scheduledDate: Date,
  message: string,
) => {
  NotificationsAPI.scheduleNotification({
    ...dailyReminderBaseParams,
    date: scheduledDate,
    id: scheduledDate.getHours(),
    subText: HOURS_AS_TIME_STRING[scheduledDate.getHours()],
    message,
    invokeApp: false,
    autoCancel: false,
    repeatType: 'day',
  });
};

export const showLowSupplyNotification = (title: string, message: string) => {
  NotificationsAPI.showNotification({
    channelId: channelsData.byId.daily_notifications.channelId,
    tag: 'supply',
    title,
    message,
  });
};

export const issueLowSupplyNotifications = (medications: Medication[]) => {
  const {depleted, depletes_soon} = groupMedicationsBySupply(medications);

  depleted.length > 0 &&
    showLowSupplyNotification(
      'Закончились лекарства',
      depleted.map(({name}) => name).join(', '),
    );

  depletes_soon.length > 0 &&
    showLowSupplyNotification(
      'Заканчиваются лекарства',
      depletes_soon.map(({name}) => name).join(', '),
    );
};

export const createReminder = (assignedHour: number) => {
  const scheduledDate = getAvailableDateFromHour(assignedHour);
  scheduleDailyNotification(scheduledDate, 'Не забудьте принять лекарства!');
};

export const cancelReminder = (hour: number) => {
  NotificationsAPI.cancelNotification(dailyReminderBaseParams.tag, hour);
};

export const cancelAllLocalNotifications =
  NotificationsAPI.cancelAllNotifications;

export const onNotificationAction = async ({
  store,
  persistor,
  notification,
  persistorLoadedListener,
}: onNotification) => {
  const wasAlreadyInvoked = notificationsInProcessCache.has(notification.id);

  if (wasAlreadyInvoked) {
    return;
  } else {
    notificationsInProcessCache.add(notification.id);
    const hourId = Number(notification.id);
    try {
      await persistorLoadedListener(persistor);
      store.dispatch(scheduledDailyMedicationsRefreshThunk());
      store.dispatch(confirmConsumptionThunk(hourId));
      await persistor.flush();
    } catch {
      cancelReminder(hourId);
    } finally {
      notificationsInProcessCache.delete(notification.id);
    }
  }
};

export const notificationListener = ({
  store,
  persistor,
  persistorLoadedListener,
}: NotificationsParams) => (notification: ReceivedNotification) =>
  onNotificationAction({
    notification,
    store,
    persistor,
    persistorLoadedListener,
  });

export const initMedicationsNotifications = ({
  store,
  persistor,
  persistorLoadedListener,
}: NotificationsParams) => {
  NotificationsAPI.configure({
    channelsConfigs: Object.values(channelsData.byId),
    listeners: [
      notificationListener({store, persistor, persistorLoadedListener}),
    ],
  });
};
