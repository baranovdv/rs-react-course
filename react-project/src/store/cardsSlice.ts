import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getItemsOnPageFromLS,
  getSearchQueryFromLS,
} from '../utils/localStorage/localStorage';
import { COMMON_DATA } from '../data/data';
import { Store } from '../data/interfaces';
import { ResultData } from '../data/types';
import { RootState } from './store';

const initialState: Store = {
  searchQuery: getSearchQueryFromLS() || '',
  itemsOnPage: getItemsOnPageFromLS() || COMMON_DATA.defaultItemsOnPage,
  content: null,
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload || '';
    },
    setCards: (state, action: PayloadAction<ResultData[] | null>) => {
      state.content = action.payload;
    },
    setItemsOnPage: (state, action: PayloadAction<number>) => {
      state.itemsOnPage = action.payload || COMMON_DATA.defaultItemsOnPage;
    },
  },
});

const selectSearchQuery = (state: RootState) => state.cards.searchQuery;
const selectCards = (state: RootState) => state.cards.content;
const selectItemsOnPage = (state: RootState) => state.cards.itemsOnPage;

export const { setSearchQuery, setCards, setItemsOnPage } = cardsSlice.actions;
export { selectSearchQuery, selectCards, selectItemsOnPage };
export default cardsSlice.reducer;
