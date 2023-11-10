import { createContext, useState } from 'react';
import { getSearchQueryFromLS } from '../utils/localStorage/localStorage';
import { ISearchQueryContext } from '../data/interfaces';

const SearchQueryContext = createContext<ISearchQueryContext>({
  searchQuery: '',
  updateSearchQuery: () => {},
});

const SearchQueryState = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>(
    getSearchQueryFromLS()
  );

  const updateSearchQuery = (query: string) => setSearchQuery(query);

  return (
    <SearchQueryContext.Provider value={{ searchQuery, updateSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export { SearchQueryContext, SearchQueryState };
