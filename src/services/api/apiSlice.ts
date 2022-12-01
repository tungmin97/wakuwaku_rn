import { AnimeByGenres } from './../../types/animeTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnimeFullById, JustMissedAnimeProps, TopAnime } from '@src/types/animeTypes';

const baseURL: string = 'https://api.jikan.moe/v4';

export const animeAPI = createApi({
  reducerPath: 'animeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getTopAnime: builder.query<TopAnime, number>({
      query: (page) => `/top/anime?page=${page}&limit=10`,
    }),
    getUpcomingAnime: builder.query<TopAnime, number>({
      query: (page) => `/seasons/upcoming?page=${page}&limit=10`,
    }),
    getSeasonalAnime: builder.query<TopAnime, number>({
      query: (page) => `/seasons/now?page=${page}&limit=10`,
    }),
    getJustMissedAnime: builder.query<TopAnime, JustMissedAnimeProps>({
      query: ({ year, season, page }) => `/seasons/${year}/${season}?page=${page}&limit=10`,
    }),
    getAnimeByGenres: builder.query<TopAnime, AnimeByGenres>({
      query: ({ page, genre }) =>
        `/anime?page=${page}&limit=10&type=tv&genres=${genre}&rating=pg13,r17`,
    }),
    getAnimeSchedule: builder.query<TopAnime, string>({
      query: (day) => `/schedules?sfw=false&kids=false&filter=${day}`,
    }),
    getAnimeFullById: builder.query<AnimeFullById, number>({
      query: (id) => `/anime/${id}/full`,
    }),
  }),
});

export const {
  useGetAnimeFullByIdQuery,
  useGetAnimeScheduleQuery,
  useLazyGetTopAnimeQuery,
  useLazyGetUpcomingAnimeQuery,
  useLazyGetSeasonalAnimeQuery,
  useLazyGetJustMissedAnimeQuery,
  useLazyGetAnimeByGenresQuery,
} = animeAPI;
