import { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimeById, AnimeFullById } from './animeTypes';

export interface AnimeCardProps {
  item: AnimeById;
}

export type RootStackParamList = {
  SplashScreen: undefined;
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Login: undefined;
};

export type HomeStackParamList = {
  Home: AnimeStackParamList;
  Watchlist: WatchlistStackParamList;
  User: undefined;
};

export type AnimeStackParamList = {
  AnimeHome: undefined;
  AnimeDetails: { item: AnimeFullById };
};

export type WatchlistStackParamList = {
  ListHome: undefined;
  ListDetails: { item: AnimeFullById };
};

export type AnimeStackProps = NativeStackScreenProps<AnimeStackParamList>;

export type AnimeStackNavigationProps = NativeStackScreenProps<AnimeStackParamList>['navigation'];

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type Props = NativeStackScreenProps<RootStackParamList>;
