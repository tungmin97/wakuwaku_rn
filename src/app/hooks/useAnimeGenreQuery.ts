import { AnimeByGenres } from './../../types/animeTypes';
import { useEffect, useState } from 'react';
import { AnimeById, TopAnime } from '@src/types/animeTypes';
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

interface Props {
  data: TopAnime | undefined;
  trigger: LazyQueryTrigger<QueryDefinition<AnimeByGenres, any, never, TopAnime, 'animeAPI'>>;
  isFetching: boolean;
  isSuccess: boolean;
  originalArgs: AnimeByGenres | undefined;
  genre: number;
}

export const useAnimeGenreQuery = ({
  data,
  trigger,
  isFetching,
  isSuccess,
  originalArgs,
  genre,
}: Props) => {
  const [curPage, setCurPage] = useState(1);
  const [results, setResults] = useState<AnimeById[]>([]);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isSrolled, setIsSrolled] = useState(false);

  useEffect(() => {
    const args = { genre: genre, page: curPage };
    trigger(args);
  }, [curPage, genre, trigger]);

  useEffect(() => {
    if (isFetching || isSuccess === false) {
      return;
    }
    if (isFetching && originalArgs?.page === 1) {
      setIsFirstLoad(true);
    } else {
      setIsFirstLoad(false);
    }
    if (!data?.pagination.has_next_page || !data.data) {
      setHasReachedEnd(true);
    } else {
      setHasReachedEnd(false);
    }
    data?.data && setResults((prev) => [...new Set([...prev, ...data.data])]);
  }, [data, isFetching, isSuccess, originalArgs]);

  const handleOnEndReached = () => {
    if (isSrolled && !hasReachedEnd) {
      setCurPage((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    setIsFirstLoad(true);
    setHasReachedEnd(false);
    setResults([]);
    trigger({ page: 1, genre: genre });
  };

  const handleScroll = () => {
    setIsSrolled(true);
  };

  return { results, isFirstLoad, handleOnEndReached, handleRefresh, handleScroll };
};
