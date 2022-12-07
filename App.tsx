import React, { useEffect } from 'react';
import AppNavigation from '@src/app/appNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import notifee, { EventType } from '@notifee/react-native';
import { StatusBar } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useToast } from '@app/hooks/useToast';

const App = () => {
  const { handleFailureToast } = useToast();

  useEffect(() => {
    return notifee.onForegroundEvent(({ type }) => {
      if (type === EventType.APP_BLOCKED) {
        handleFailureToast({
          title: 'App blocked',
          body: "We don't have the neccessary permission",
        });
      }
    });
  }, [handleFailureToast]);

  notifee.onBackgroundEvent(async ({ detail }) => {
    const { notification, pressAction } = detail;

    if (pressAction?.id === 'dismiss' && notification?.id) {
      await notifee.cancelNotification(notification.id);
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
