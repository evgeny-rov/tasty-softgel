import PushNotification, {
  PushNotificationObject,
  PushNotificationScheduleObject,
  ReceivedNotification,
} from 'react-native-push-notification';
import { theme } from 'src/styles';

type channelConfig = {
  readonly channelId: string;
  readonly channelName: string;
  readonly importance: number;
  readonly vibrate: boolean;
};

type initApiArguments = {
  channelsConfigs: Array<channelConfig>;
  listeners: Array<(notification: ReceivedNotification) => void>;
};

const baseParams = {
  allowWhileIdle: true,
  color: theme.colors.accent,
  smallIcon: 'ic_notification',
  priority: 'max',
} as const;

export const showNotification = (params: PushNotificationObject) => {
  PushNotification.localNotification({...baseParams, ...params});
};

export const scheduleNotification = (
  params: PushNotificationScheduleObject,
) => {
  PushNotification.localNotificationSchedule({...baseParams, ...params});
};

export const cancelNotification = (tag: string, id: number, details = {}) => {
  PushNotification.clearLocalNotification(tag, id);
  PushNotification.cancelLocalNotifications({id: id.toString(), ...details});
};

export const cancelAllNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

const handleAction = (
  notification: ReceivedNotification,
  listeners: Array<Function>,
) => {
  listeners.forEach((listener) => listener(notification));
};

export const configure = ({channelsConfigs, listeners}: initApiArguments) => {
  PushNotification.configure({
    onAction: (notification) => handleAction(notification, listeners),
    requestPermissions: false,
  });

  PushNotification.getChannels((existingChannels) => {
    const isChannelsAlreadyConfigured = channelsConfigs.every((channel) =>
      existingChannels.includes(channel.channelId),
    );

    if (isChannelsAlreadyConfigured) return;

    channelsConfigs.forEach((channel) =>
      PushNotification.createChannel(channel, () => null),
    );
  });
};
