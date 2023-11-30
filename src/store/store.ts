import { configureStore } from '@reduxjs/toolkit';
import uncontrolledSlice from './uncontrolledSlice';

export const store = configureStore({
  reducer: {
    uncontrolled: uncontrolledSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
