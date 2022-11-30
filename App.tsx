import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigation from '@src/app/appNavigation';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
      />
      <SafeAreaView className="flex-1">
        <AppNavigation />
      </SafeAreaView>
    </>
  );
};

export default App;
