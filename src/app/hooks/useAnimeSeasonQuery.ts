import { useEffect, useState } from 'react';
import { AnimeById, JustMissedAnimeProps, TopAnime } from '@src/types/animeTypes';
import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { getLastSeason } from '@utils/getLastSeason';

interface Props {
  data: TopAnime | undefined;
  trigger: LazyQueryTrigger<
    QueryDefinition<JustMissedAnimeProps, any, never, TopAnime, 'animeAPI'>
  >;
  isFetching: boolean;
  isSuccess: boolean;
  originalArgs: JustMissedAnimeProps | undefined;
}

export const useAnimeSeasonQuery = ({
  data,
  trigger,
  isFetching,
  isSuccess,
  originalArgs,
}: Props) => {
  const { lastSeason, year } = getLastSeason();
  const [curPage, setCurPage] = useState(1);
  const [results, setResults] = useState<AnimeById[]>([]);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isSrolled, setIsSrolled] = useState(false);

  useEffect(() => {
    const args = { year: year, season: lastSeason, page: curPage };

    trigger(args);
  }, [curPage, lastSeason, year, trigger]);

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
    data?.data &&
      setResults((prev) => [
        ...new Set([
          ...prev,
          ...data.data.filter(
            (item) => item.rating !== 'R+ - Mild Nudity' || 'Rx - Hentai' || 'PG - Children',
          ),
        ]),
      ]);
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
    trigger({ year: year, season: lastSeason, page: 1 });
  };

  const handleScroll = () => {
    setIsSrolled(true);
  };

  return { results, isFirstLoad, handleOnEndReached, handleRefresh, handleScroll };
};
