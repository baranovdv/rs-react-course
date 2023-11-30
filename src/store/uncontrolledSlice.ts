import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyFormData } from '../data/types';
import { initialResult } from './initialResult';
import { RootState } from './store';

const initialState: MyFormData = initialResult;

const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    setUncontrolledStore: (state, action: PayloadAction<MyFormData>) => {
      state = action.payload || '';
    },
  },
});

const selectUncontrolledStore = (state: RootState) => state.uncontrolled;

export const { setUncontrolledStore } = uncontrolledSlice.actions;

export { selectUncontrolledStore };
export default uncontrolledSlice.reducer;
