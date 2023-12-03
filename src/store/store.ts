import { configureStore } from '@reduxjs/toolkit';
import resultsSlice from './resultsSlice';

export const store = configureStore({
  reducer: {
    results: resultsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
