import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  Notification,
  TimestampTrigger,
  TriggerNotification,
  TriggerType,
} from '@notifee/react-native';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import { useToast } from '@app/hooks/useToast';

//Starting in Android 8.0 (API level 26), all notifications must be assigned to a channel.
export const useNotification = () => {
  const ANDROID_CHANNEL_ID = 'show-notifs';

  const { handleSuccessToast } = useToast();

  const createAndroidNotifChannel = async () => {
    await notifee.deleteChannel(ANDROID_CHANNEL_ID);
    await notifee.createChannel({
      id: ANDROID_CHANNEL_ID,
      name: ANDROID_CHANNEL_ID,
      vibration: true,
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });
  };

  const createBaseNotification = (
    title: string,
    body: string,
    data: { [key: string]: string },
  ): Notification => ({
    id: nanoid(),
    title,
    body,
    data,
    android: {
      channelId: ANDROID_CHANNEL_ID,
      pressAction: {
        id: 'default',
      },
    },
  });

  const createReminderNotification = async (notificationDetails: {
    id: number;
    name: string;
    time: any;
  }) => {
    const notificationData = {
      id: `${notificationDetails.id}`,
      time: `${notificationDetails.time}`,
    };

    const { name, time } = notificationDetails;
    const notification = createBaseNotification(
      `${name}'s about to begin!`,
      'Are you ready? Grab the popcorn',
      notificationData,
    );

    await createTimestampNotification(time, notification);
  };

  const checkAndroidAlarmPermissionSettings = async () => {
    const settings = await notifee.getNotificationSettings();
    if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
      await notifee.openAlarmPermissionSettings();
    }
  };

  const createTimestampNotification = async (
    date: Date,
    notification: Notification,
  ): Promise<void> => {
    await createAndroidNotifChannel();
    await checkAndroidAlarmPermissionSettings();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(notification, trigger);
    await notifee.getTriggerNotifications();
  };

  const getReminderNotifications = async (id: string): Promise<TriggerNotification[]> => {
    const triggerNotifs = await notifee.getTriggerNotifications();
    return triggerNotifs.filter(({ notification }) => notification.data?.id === id) || [];
  };

  const deleteNotifications = async (id: string) => {
    const triggerNotifications = await getReminderNotifications(id);

    await notifee.cancelTriggerNotifications(
      triggerNotifications.map((triggerNotif) => triggerNotif.notification.id!),
    );
  };

  const clearAllNotifications = async () => {
    handleSuccessToast({
      title: 'Notification cleared',
      body: 'Successfully deleted all notifications',
    });
    await notifee.cancelAllNotifications();
  };

  return {
    createReminderNotification,
    getReminderNotifications,
    deleteNotifications,
    clearAllNotifications,
  };
};
