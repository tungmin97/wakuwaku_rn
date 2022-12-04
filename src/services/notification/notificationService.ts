import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  Notification,
  TimestampTrigger,
  TriggerNotification,
  TriggerType,
} from '@notifee/react-native';
import dayjs from 'dayjs';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';

//Starting in Android 8.0 (API level 26), all notifications must be assigned to a channel.
const LOGGER_PREFIX = '[NotificationService]';
const ANDROID_CHANNEL_ID = 'show-notifs';

export const createAndroidNotifChannel = async () => {
  await notifee.deleteChannel(ANDROID_CHANNEL_ID);
  await notifee.createChannel({
    id: ANDROID_CHANNEL_ID,
    name: ANDROID_CHANNEL_ID,
    vibration: true,
    importance: AndroidImportance.HIGH,
    sound: 'default',
  });

  const channel = await notifee.getChannel(ANDROID_CHANNEL_ID);
  if (channel?.blocked) {
    console.debug(`${LOGGER_PREFIX} Channel ${ANDROID_CHANNEL_ID} is disabled`);
  } else {
    console.debug(`${LOGGER_PREFIX} Channel ${ANDROID_CHANNEL_ID} is enabled`);
  }
};

export const createBaseNotification = (
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

export const createReminderNotification = async (notificationDetails: {
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
    `${name} about to begin!`,
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

  const createdNotification = await notifee.createTriggerNotification(notification, trigger);

  const triggerNotifs = await notifee.getTriggerNotifications();

  console.log(
    `pending: ${triggerNotifs}, ${LOGGER_PREFIX} A notification has been created successfully for: ${dayjs(
      createdNotification,
    ).format()}`,
  );
};

const getReminderNotifications = async (id: string): Promise<TriggerNotification[]> => {
  const triggerNotifs = await notifee.getTriggerNotifications();
  return triggerNotifs.filter(({ notification }) => notification.data?.id === id) || [];
};

export const deleteNotifications = async (id: string) => {
  const triggerNotifications = await getReminderNotifications(id);

  await notifee.cancelTriggerNotifications(
    triggerNotifications.map((triggerNotif) => triggerNotif.notification.id!),
  );
};

export const clearAllNotifications = async () => {
  console.debug('Clearing all notifications');
  await notifee.cancelAllNotifications();
};

// For testing purpose only
export const displayNotification = async () => {
  await createAndroidNotifChannel();
  await notifee.displayNotification({
    title: 'Test notification',
    android: {
      channelId: ANDROID_CHANNEL_ID,
      pressAction: {
        id: 'default',
      },
    },
  });
};
