import { AnimeByGenres } from './../../types/animeTypes';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
  AnimeFullById,
  TopAnime,
  JustMissedAnimeProps,
  AnimeVideosEpisodes,
  AnimeReviews,
} from '@src/types/animeTypes';

const baseURL: string = 'https://api.jikan.moe/v4';
const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: baseURL }), {
  maxRetries: 10,
});

export const animeAPI = createApi({
  reducerPath: 'animeAPI',
  baseQuery: staggeredBaseQuery,
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
    getAnimeSearch: builder.query<TopAnime, string>({
      query: (input) => `/anime?letter=${input}&sfw=true&order_by=favorites&sort=desc`,
    }),
    getAnimeVideosEpisodes: builder.query<AnimeVideosEpisodes, number>({
      query: (id) => `/anime/${id}/videos/episodes`,
    }),
    getAnimeReviews: builder.query<AnimeReviews, number>({
      query: (id) => `/anime/${id}/reviews`,
    }),
  }),
});

export const {
  useGetAnimeFullByIdQuery,
  useGetTopAnimeQuery,
  useGetAnimeScheduleQuery,
  useLazyGetTopAnimeQuery,
  useLazyGetUpcomingAnimeQuery,
  useLazyGetSeasonalAnimeQuery,
  useLazyGetJustMissedAnimeQuery,
  useGetAnimeSearchQuery,
  useLazyGetAnimeByGenresQuery,
  useGetAnimeVideosEpisodesQuery,
  useGetAnimeReviewsQuery,
} = animeAPI;
