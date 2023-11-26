import { COMMON_DATA } from '../../data/data';

const getItemsOnPageFromLS = () => {
  return (
    Number(localStorage.getItem(COMMON_DATA.localStorageItemsOnPage)) ||
    COMMON_DATA.defaultItemsOnPage
  );
};

const getSearchQueryFromLS = () => {
  return localStorage.getItem(COMMON_DATA.localStorageQuery) || '';
};

const setSearchQueryToLS = (searchQuery: string) => {
  localStorage.setItem(COMMON_DATA.localStorageQuery, searchQuery || '');
};

const setItemsOnPageToLS = (itemsOnPage: string) => {
  localStorage.setItem(
    COMMON_DATA.localStorageItemsOnPage,
    itemsOnPage || COMMON_DATA.defaultItemsOnPage.toString()
  );
};

export {
  getSearchQueryFromLS,
  getItemsOnPageFromLS,
  setSearchQueryToLS,
  setItemsOnPageToLS,
};
