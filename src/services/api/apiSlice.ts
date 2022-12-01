import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnimeFullById, TopAnime, AnimeVideosEpisodes, AnimeReviews } from '@src/types/animeTypes';

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
    getAnimeFullById: builder.query<AnimeFullById, number>({
      query: (id) => `/anime/${id}/full`,
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
  useLazyGetTopAnimeQuery,
  useLazyGetUpcomingAnimeQuery,
  useLazyGetSeasonalAnimeQuery,
  useLazyGetJustMissedAnimeQuery,
  useGetAnimeVideosEpisodesQuery,
  useGetAnimeReviewsQuery,
} = animeAPI;
