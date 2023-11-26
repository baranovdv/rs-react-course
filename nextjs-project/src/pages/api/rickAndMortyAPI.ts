import { COMMON_DATA } from '@/data/data';
import { type ResultData, type ResponseData } from '@/data/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const rickAndMortyAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: COMMON_DATA.baseAPIurl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: (builder) => ({
    getCards: builder.query<ResponseData, string>({
      query: (query) => `character/${query}`,
    }),
    getCardById: builder.query<ResultData, string>({
      query: (id) => `character/${id}`,
    }),
  }),
});

export const {
  useGetCardsQuery,
  useGetCardByIdQuery,
  util: { getRunningQueriesThunk },
} = rickAndMortyAPI;

// export endpoints for use in SSR
export const { getCards, getCardById } = rickAndMortyAPI.endpoints;
