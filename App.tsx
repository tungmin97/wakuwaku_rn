import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
// import HomeScreen from '@src/screens/HomeScreen';
import AppNavigation from '@src/app/appNavigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <AppNavigation />
      </SafeAreaView>
    </>
  );
};

export default App;
