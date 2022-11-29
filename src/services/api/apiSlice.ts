import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnimeFullById, TopAnime } from '@src/types/animeTypes';

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
    getJustMissedAnime: builder.query<TopAnime, any>({
      query: ({ year, season, page }) => `/seasons/${year}/${season}?page=${page}&limit=10`,
    }),
    getAnimeSchedule: builder.query({
      query: (day) => `/schedules?sfw=&filter=${day}`,
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
} = animeAPI;
