import { Action, Store } from '../data/interfaces';

const storeReducer = (state: Store, action: Action): Store => {
  switch (action.type) {
    case 'change_items_on_page': {
      return {
        ...state,
        itemsOnPage: action.itemsOnPage || 20,
      };
    }
    case 'submit_search_query': {
      return {
        ...state,
        searchQuery: action.searchQuery || '',
      };
    }
    case 'update_content': {
      return {
        ...state,
        content: action.content || null,
      };
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
};

export { storeReducer };
