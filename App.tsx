import React, { useEffect } from 'react';
import AppNavigation from '@src/app/appNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import notifee, { EventType } from '@notifee/react-native';
import { StatusBar } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useAppSelector } from '@app/hooks/main';
import { useAsyncStorage } from '@app/hooks/useAsyncStorage';

const App = () => {
  const { setStorage } = useAsyncStorage('credential');
  const curUser = useAppSelector((state) => state.user.currentUser?.data());
  curUser && setStorage(curUser);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.APP_BLOCKED) {
        console.error('User toggled app blocked', detail.blocked);
      }

      if (type === EventType.DISMISSED) {
        console.debug('User dismissed notif');
      }

      if (type === EventType.PRESS) {
        console.debug('User pressed notif');
      }
    });
  }, []);

  notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (pressAction?.id === 'dismiss' && notification?.id) {
      await notifee.cancelNotification(notification.id);
    }
    if (type === EventType.APP_BLOCKED) {
      console.error('User toggled app blocked', detail.blocked);
    }
  });

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
      />
      <SafeAreaProvider>
        <AppNavigation />
        <Toast />
      </SafeAreaProvider>
    </>
  );
};

export default App;
