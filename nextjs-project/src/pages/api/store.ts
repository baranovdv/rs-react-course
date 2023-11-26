import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { rickAndMortyAPI } from './rickAndMortyAPI';

export const makeStore = () =>
  configureStore({
    reducer: {
      [rickAndMortyAPI.reducerPath]: rickAndMortyAPI.reducer,
    },
    middleware: (gDM) => gDM().concat(rickAndMortyAPI.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
