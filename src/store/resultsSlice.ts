import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyFormData, MyResultData } from '../data/interfaces';
import { RootState } from './store';

const initialState: MyResultData[] = [];

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResult: (state, action: PayloadAction<MyFormData>) => {
      const isLastIndex = state.findIndex((result) => result?.isLast === true);
      if (isLastIndex >= 0) state[isLastIndex].isLast = false;

      const newResultIndex = state.findIndex(
        (result) => result.id === action.payload.id
      );
      if (newResultIndex >= 0) {
        state[newResultIndex] = { ...action.payload, isLast: true };
      } else {
        state.unshift({
          ...action.payload,
          isLast: true,
        });
      }
    },
  },
});

const selectResultsStore = (state: RootState) => state.results;

export const { addResult } = resultsSlice.actions;

export { selectResultsStore };
export default resultsSlice.reducer;
