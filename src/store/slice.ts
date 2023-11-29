import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../data/interfaces';
import { RootState } from './store';

const initialState: Store = {
  data: '',
};

const xxxSlice = createSlice({
  name: 'xxx',
  initialState,
  reducers: {
    setXxx: (state, action: PayloadAction<string>) => {
      state.data = action.payload || '';
    },
  },
});

const selectXxx = (state: RootState) => state.xxx.data;

export const { setXxx } = xxxSlice.actions;

export { selectXxx };
export default xxxSlice.reducer;
