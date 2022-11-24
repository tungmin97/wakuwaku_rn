import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HomeScreen from '@src/screens/HomeScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <HomeScreen />
      </SafeAreaView>
    </>
  );
};

export default App;
