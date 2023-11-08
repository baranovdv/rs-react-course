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

const setSearchQueryFromLS = (itemsOnPage: number) => {
  localStorage.setItem(
    COMMON_DATA.localStorageItemsOnPage,
    itemsOnPage.toString() || COMMON_DATA.defaultItemsOnPage.toString()
  );
};

export { getSearchQueryFromLS, getItemsOnPageFromLS, setSearchQueryFromLS };
