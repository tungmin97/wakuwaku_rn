import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '@src/screens/HomeScreen';
import UserScreen from '@src/screens/UserScreen';
import SplashScreen from '@src/screens/SplashScreen';
import Authentication from '@src/screens/Authentication';
import WatchlistScreen from '@src/screens/WatchlistScreen';
import { HomeStackParamList, RootStackParamList } from 'src/types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Watchlist" component={WatchlistScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  const isSignIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignIn ? (
          <>
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            <Stack.Screen name="HomeTab" component={HomeTab} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Authentication} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
