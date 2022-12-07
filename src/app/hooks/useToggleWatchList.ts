import { TriggerNotification } from '@notifee/react-native';
import { useEffect, useState } from 'react';
import { useMMKVObject } from 'react-native-mmkv';
import { AnimeById } from '@src/types/animeTypes';
import { useWatchList } from './useWatchList';

export const useToggleWatchList = (item: AnimeById) => {
  const [isOnWatchList, setIsOnWatchList] = useState(false);
  const [isOnNotification, setIsOnNotification] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { handleAddWatchList, handleRemoveWatchList, watchList } = useWatchList();
  const [data] = useMMKVObject<TriggerNotification[]>('notifications');

  const watchlistHandler = () => {
    if (isOnWatchList) {
      handleRemoveWatchList(item);
      setIsOnWatchList(false);
    } else {
      handleAddWatchList(item);
      setIsOnWatchList(true);
    }
  };

  useEffect(() => {
    if (!watchList) {
      setIsReady(false);
    }
    if (watchList?.animeList.some((anime: AnimeById) => anime.mal_id === item.mal_id)) {
      setIsOnWatchList(true);
      setIsReady(true);
    } else {
      setIsOnWatchList(false);
      setIsReady(true);
    }
  }, [item.mal_id, watchList]);

  useEffect(() => {
    if (
      data?.some((entry) =>
        watchList?.animeList.map(
          (anime: AnimeById) => +entry.notification.data?.id! === anime.mal_id,
        ),
      )
    ) {
      setIsOnNotification(true);
    } else {
      setIsOnNotification(false);
    }
  }, [data, watchList]);

  const toggleNotification = () => setIsOnNotification(!isOnNotification);
  return { watchlistHandler, isOnWatchList, isReady, isOnNotification, toggleNotification };
};
