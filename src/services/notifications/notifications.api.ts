import PushNotification, {
  PushNotificationScheduleObject,
  ReceivedNotification,
} from 'react-native-push-notification';

/* spec
  requirements from api:
    initialization with received configs 
    scheduling notifications with received data
    canceling / clearing notifications
    handling actions
*/

type channelConfig = {
  readonly channelId: string;
  readonly channelName: string;
  readonly importance: number;
  readonly vibrate: boolean;
};

type initApiArguments = {
  channelsConfigs: Array<channelConfig>;
  onNotificationActions: (notification: ReceivedNotification) => void;
};

export const scheduleNotification = (
  params: PushNotificationScheduleObject,
) => {
  PushNotification.scheduleLocalNotification(params);
};

export const cancelNotification = (tag: string, id: number, details = {}) => {
  PushNotification.clearLocalNotification(tag, id);
  PushNotification.cancelLocalNotifications({id: id.toString(), ...details});
};

export const configure = ({
  channelsConfigs,
  onNotificationActions,
}: initApiArguments) => {
  PushNotification.configure({
    onAction: onNotificationActions,
    requestPermissions: false,
  });

  PushNotification.getChannels((existingChannels) => {
    const channelsAlreadyConfigured = channelsConfigs.every((channel) =>
      existingChannels.includes(channel.channelId),
    );

    if (channelsAlreadyConfigured) return;

    channelsConfigs.forEach((channel) =>
      PushNotification.createChannel(channel, () => null),
    );
  });
};
