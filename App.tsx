import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from '@src/app/appNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
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
      </SafeAreaProvider>
    </>
  );
};

export default App;
