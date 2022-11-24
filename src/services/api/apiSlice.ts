import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AnimeFullById } from 'src/types/types';

const baseURL: string = 'https://api.jikan.moe/v4';

export const animeAPI = createApi({
  reducerPath: 'animeAPI',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getAnimeFullById: builder.query<AnimeFullById, number>({
      query: (id) => `/anime/${id}/full`,
    }),
  }),
});

export const { useGetAnimeFullByIdQuery } = animeAPI;
