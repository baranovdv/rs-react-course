import { createSlice } from '@reduxjs/toolkit';
import { countriesList } from '../data/countriesList';
import { RootState } from './store';

const initialState: string[] = countriesList;

const resultsSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

const selectCountriesStore = (state: RootState) => state.countries;

export { selectCountriesStore };
export default resultsSlice.reducer;
