import { QUERYS } from '@/data/data';

const getSearchQuery = (query: string): string => {
  let searchQuery = '';

  if (query.includes(QUERYS.search)) {
    const searchQueryURL = query
      .split('&')
      .find((string) => string.match(QUERYS.search));
    if (searchQueryURL)
      searchQuery = searchQueryURL.slice(QUERYS.search.length);
  }

  return searchQuery;
};

export { getSearchQuery };
