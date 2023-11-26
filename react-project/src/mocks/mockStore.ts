import { configureStore } from '@reduxjs/toolkit';
import { rickAndMortyAPI } from '../API/rickAndMortyAPI';
import mockSlice from './mockSlice';

export const mockStore = configureStore({
  reducer: {
    cards: mockSlice,
    [rickAndMortyAPI.reducerPath]: rickAndMortyAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyAPI.middleware),
});

export type AppDispatch = typeof mockStore.dispatch;
export type RootState = ReturnType<typeof mockStore.getState>;
