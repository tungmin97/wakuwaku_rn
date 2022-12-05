import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import UserScreen from '@screens/UserScreen';
// import SplashScreen from '@screens/SplashScreen';
import WatchlistScreen from '@screens/WatchlistScreen';
import DetailScreen from '@screens/DetailScreen';
import ScheduleScreen from '@screens/ScheduleScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeStackParamList, RootStackParamList } from '@src/types/types';
import LoginScreen from '@src/screens/LoginScreen';
import SignUpScreen from '@src/screens/SignUpScreen';
import auth from '@react-native-firebase/auth';
import SearchScreen from '@screens/SearchScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
          paddingHorizontal: 5,
          paddingTop: 5,
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: '#564D4D',
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: { color: '#f8f7ff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={25} color={color} />,
          tabBarIconStyle: { marginBottom: 0 },
          tabBarInactiveTintColor: '#333',
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarLabelStyle: { color: '#f8f7ff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="apps" size={25} color={color} />,
          tabBarIconStyle: { marginBottom: 0 },
          tabBarInactiveTintColor: '#333',
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistScreen}
        options={{
          tabBarLabelStyle: { color: '#f8f7ff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="movie-filter" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabelStyle: { color: '#f8f7ff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={25} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default function AppNavigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  console.log(user);

  useEffect(() => {
    const onAuthStateChanged = (user) => {
      setUser(user);

      if (initializing) setInitializing(false);
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
            <Stack.Screen name="HomeTab" component={HomeTab} />
            <Stack.Screen name="Details" component={DetailScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
