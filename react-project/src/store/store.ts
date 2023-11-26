import { configureStore } from '@reduxjs/toolkit';
import { rickAndMortyAPI } from '../API/rickAndMortyAPI';
import cardsSlice from './cardsSlice';

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    [rickAndMortyAPI.reducerPath]: rickAndMortyAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
