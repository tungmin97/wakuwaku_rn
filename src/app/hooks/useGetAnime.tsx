import { useState } from 'react';
import { useLazyGetTopAnimeQuery } from 'src/services/api/apiSlice';
import { AnimeById } from 'src/types/animeTypes';

export const useGetAnime = () => {
  const [curPage, setCurPage] = useState(1);
  const [results, setResults] = useState<AnimeById[]>([]);

  const [trigger, { data, isFetching, isSuccess, originalArgs }] = useLazyGetTopAnimeQuery;
};
