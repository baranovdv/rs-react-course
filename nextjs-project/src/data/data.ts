import { type urlQuery } from './types';

export const COMMON_DATA = {
  inputLabel: 'Search by name:',
  tableHeaders: ['Name:', 'Description:'],
  APIurl: 'https://rickandmortyapi.com/api/character/',
  baseAPIurl: 'https://rickandmortyapi.com/api',
  localStorageQuery: 'search_Query',
  localStorageItemsOnPage: 'itemsOnPage',
  pageURLQuery: 'page',
  detailsURLQuery: 'details',
  defaultItemsOnPage: 20,
  notFound: 'Results not found',
  startPage: '1',
};

export const MENU_DATA = {
  selectLabel: 'Items on page:',
  selectOptions: [5, 10, 20],
};

export const CARD_DATA = {
  buttonLabel: 'Show details',
};

export const NUM_OF_API_ITEMS = 20;

export const ERROR_DATA = {
  errorPageMessage: 'Unknown Error!',
  consoleMessage: 'Error caught by ErrorBoundary:',
  htmlMessage: 'Something went wrong. Please try again later.',
  pageError: 0,
  notFoundCode: 404,
  noID: '0',
};

export const QUERYS: Record<string, urlQuery> = {
  page: 'page=',
  search: 'search=',
  items: 'items=',
  details: 'details=',
};

export const TEST_DATA = {
  SPINNER: 'spinner',
  CARD: 'card-item',
  DETAILS: 'details-item',
  ASIDE_BUTTON_CLOSE: 'aside-button-close',
  NEXT_PAGE: 'button-next-page',
  PREV_PAGE: 'button-prev-page',
  SEARCH_INPUT: 'search-input-item',
  SEARCH_SUBMIT: 'search-button-submit',
  IMG_404: 'error_404_img',
  SEARCH_ERROR_QUERY: 'errorQuery',
};
