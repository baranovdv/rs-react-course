import {
  getItemsOnPageFromLS,
  getSearchQueryFromLS,
} from '../utils/localStorage/localStorage';
import { COMMON_DATA } from '../data/data';
import { Store } from '../data/interfaces';

const initialStore: Store = {
  searchQuery: getSearchQueryFromLS() || '',
  itemsOnPage: getItemsOnPageFromLS() || COMMON_DATA.defaultItemsOnPage,
  content: null,
};

export { initialStore };
