import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import UserScreen from '@screens/UserScreen';
// import SplashScreen from '@screens/SplashScreen';
import Authentication from '@screens/Authentication';
import WatchlistScreen from '@screens/WatchlistScreen';
import {
  AnimeStackParamList,
  HomeStackParamList,
  RootStackParamList,
  ScheduleStackParamList,
  WatchlistStackParamList,
} from '@src/types/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DetailScreen from '@screens/DetailScreen';
import ScheduleScreen from '@screens/ScheduleScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AnimeStack = createNativeStackNavigator<AnimeStackParamList>();
const ListStack = createNativeStackNavigator<WatchlistStackParamList>();
const ScheduleStack = createNativeStackNavigator<ScheduleStackParamList>();
const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <AnimeStack.Navigator
      initialRouteName="AnimeHome"
      screenOptions={{
        headerShown: false,
      }}>
      <AnimeStack.Screen name="AnimeHome" component={HomeScreen} />
      <AnimeStack.Screen name="AnimeDetails" component={DetailScreen} />
    </AnimeStack.Navigator>
  );
};

const WatchlistStack = () => {
  return (
    <ListStack.Navigator
      initialRouteName="ListHome"
      screenOptions={{
        headerShown: false,
      }}>
      <ListStack.Screen name="ListHome" component={WatchlistScreen} />
      <ListStack.Screen name="ListDetails" component={DetailScreen} />
    </ListStack.Navigator>
  );
};

const ScheduleStacks = () => {
  return (
    <ScheduleStack.Navigator
      initialRouteName="ScheduleHome"
      screenOptions={{
        headerShown: false,
      }}>
      <ScheduleStack.Screen name="ScheduleHome" component={ScheduleScreen} />
      <ScheduleStack.Screen name="ScheduleDetails" component={DetailScreen} />
    </ScheduleStack.Navigator>
  );
};

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
          backgroundColor: '#1A1A1Aff',
          borderTopWidth: 0,
        },
        tabBarInactiveTintColor: '#564d4d',
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabelStyle: { color: '#f8f7ffff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={25} color={color} />,
          tabBarIconStyle: { marginBottom: 0 },
          tabBarInactiveTintColor: '#333',
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleStacks}
        options={{
          tabBarLabelStyle: { color: '#f8f7ffff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="apps" size={25} color={color} />,
          tabBarIconStyle: { marginBottom: 0 },
          tabBarInactiveTintColor: '#333',
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStack}
        options={{
          tabBarLabelStyle: { color: '#f8f7ffff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="movie-filter" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabelStyle: { color: '#f8f7ffff', marginBottom: 10 },
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={25} color={color} />,
        }}
      />
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
