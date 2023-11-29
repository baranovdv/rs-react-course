import { configureStore } from '@reduxjs/toolkit';
import xxxSlice from './slice';

export const store = configureStore({
  reducer: {
    xxx: xxxSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
