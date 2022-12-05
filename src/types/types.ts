import { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimeById } from './animeTypes';

export interface AnimeCardProps {
  item: AnimeById;
}

export type RootStackParamList = {
  SplashScreen: undefined;
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Details: { item: AnimeById };
  Search: undefined;
  Login: undefined;
  SignUp: undefined;
  Search: undefined;
  ChangeUserInfo: undefined;
};

export type HomeStackParamList = {
  Home: AnimeStackParamList;
  Watchlist: WatchlistStackParamList;
  Schedule: ScheduleStackParamList;
  User: undefined;
};

export type AnimeStackParamList = {
  AnimeHome: undefined;
  AnimeDetails: { item: AnimeById };
};

export type WatchlistStackParamList = {
  ListHome: undefined;
  ListDetails: { item: AnimeById };
};

export type ScheduleStackParamList = {
  ScheduleHome: undefined;
  ScheduleDetails: { item: AnimeById };
};

export type AnimeStackProps = NativeStackScreenProps<AnimeStackParamList>;

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
export type RootStackProps = NativeStackScreenProps<RootStackParamList>;

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

export type RootStackNavigationProps = NativeStackScreenProps<RootStackParamList>['navigation'];

export type AnimeStackNavigationProps = NativeStackScreenProps<AnimeStackParamList>['navigation'];
