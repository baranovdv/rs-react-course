import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseData, ResultData } from '../data/types';
import { COMMON_DATA } from '../data/data';

export const rickAndMortyAPI = createApi({
  reducerPath: 'rickAndMortyAPI',
  baseQuery: fetchBaseQuery({ baseUrl: COMMON_DATA.baseAPIurl }),
  endpoints: (builder) => ({
    getCards: builder.query<ResponseData, string>({
      query: (query) => `character/${query}`,
    }),
    getCardById: builder.query<ResultData, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const { useGetCardsQuery, useGetCardByIdQuery } = rickAndMortyAPI;
