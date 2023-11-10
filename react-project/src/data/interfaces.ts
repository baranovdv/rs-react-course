import { ActionType, ResultData } from './types';

export interface ISearchQueryContext {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
}

export interface IContentContext {
  content: ResultData[] | null;
  updateContent: (array: ResultData[] | null) => void;
}

export interface Store {
  searchQuery: string;
  itemsOnPage: number;
  content: ResultData[] | null;
}

export interface Action {
  type: ActionType;
  itemsOnPage?: number;
  searchQuery?: string;
  content?: ResultData[] | null;
}
