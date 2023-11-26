export interface Character {
  id: number;
  name: string;
  description: string;
}

export type AppStatus = 'idle' | 'wait' | 'error' | 'throw';

export interface ResultData {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Record<'name' | 'url', string>;
  location: Record<'name' | 'url', string>;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ResponseInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ResponseData {
  info?: ResponseInfo;
  results?: ResultData[];
  error?: string;
}

export interface ErrorResponse {
  status: number;
  data: Record<'error', string>;
}

export interface SelectData {
  selectLabel: string;
  selectOptions: number[];
}

export type ActionType =
  | 'change_items_on_page'
  | 'submit_search_query'
  | 'update_content';

export type addQueryType = 'search' | 'page' | 'itemsOnPage' | 'details';

export type urlQuery = 'search=' | 'page=' | 'items=' | 'details=';
