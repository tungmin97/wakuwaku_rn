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

    getAnimeFullById: builder.query<AnimeFullById, number>({
      query: (id) => `/anime/${id}/full`,
    }),
  }),
});

export const { useGetAnimeFullByIdQuery, useLazyGetTopAnimeQuery } = animeAPI;
