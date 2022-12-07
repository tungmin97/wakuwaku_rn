import { useEffect, useState } from 'react';
import { AnimeById } from 'src/types/animeTypes';
import { useWatchList } from './useWatchList';

export const useToggleWatchList = (item: AnimeById) => {
  const [isOnWatchList, setIsOnWatchList] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { handleAddWatchList, handleRemoveWatchList, watchList } = useWatchList();

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

  return { watchlistHandler, isOnWatchList, isReady };
};
