export const COMMON_DATA = {
  inputLabel: 'Search by name:',
  tableHeaders: ['Name:', 'Description:'],
  APIurl: 'https://rickandmortyapi.com/api/character/',
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
};
