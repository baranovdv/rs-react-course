import { ResultData } from './types';

export interface ISearchQueryContext {
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
}

export interface IContentContext {
  content: ResultData[] | null;
  updateContent: (array: ResultData[] | null) => void;
}
