import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COMMON_DATA, TEST_DATA } from '../data/data';
import { Store } from '../data/interfaces';
import { ResultData } from '../data/types';
import { RootState } from './mockStore';

const initialState: Store = {
  searchQuery: TEST_DATA.SEARCH_ERROR_QUERY,
  itemsOnPage: COMMON_DATA.defaultItemsOnPage,
  content: null,
  cardsIsLoading: false,
  detailsIsLoading: false,
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
    setCardsIsLoading: (state) => {
      state.cardsIsLoading = true;
    },
    removeCardsIsLoading: (state) => {
      state.cardsIsLoading = false;
    },
    setDetailsIsLoading: (state) => {
      state.detailsIsLoading = true;
    },
    removeDetailsIsLoading: (state) => {
      state.detailsIsLoading = false;
    },
  },
});

const selectSearchQuery = (state: RootState) => state.cards.searchQuery;
const selectCards = (state: RootState) => state.cards.content;
const selectItemsOnPage = (state: RootState) => state.cards.itemsOnPage;
const selectCardsIsLoading = (state: RootState) => state.cards.cardsIsLoading;

export const {
  setSearchQuery,
  setCards,
  setItemsOnPage,
  setCardsIsLoading,
  removeCardsIsLoading,
  setDetailsIsLoading,
  removeDetailsIsLoading,
} = cardsSlice.actions;
export {
  selectSearchQuery,
  selectCards,
  selectItemsOnPage,
  selectCardsIsLoading,
};
export default cardsSlice.reducer;
