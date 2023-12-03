import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from './countriesSlice';
import resultsSlice from './resultsSlice';

export const store = configureStore({
  reducer: {
    results: resultsSlice,
    countries: countriesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
