import { COMMON_DATA, QUERYS } from '@/data/data';
import { type addQueryType } from '@/data/types';

const addQuery = (
  query: string,
  type: addQueryType,
  payload: string
): string => {
  let result = '';
  let pageNum = COMMON_DATA.startPage;
  const queryArray = query.split('&');

  if (query.includes(QUERYS.page)) {
    const pageURL = queryArray.find((string) => string.match(QUERYS.page));

    pageNum = pageURL
      ? pageURL.slice(QUERYS.page.length)
      : COMMON_DATA.startPage;
    pageNum = isFinite(+pageNum) ? pageNum : COMMON_DATA.startPage;
  }

  if (type === 'page') {
    pageNum = payload;
  }

  result = `/?${QUERYS.page}${pageNum}`;

  if (type === 'search') {
    result += `&${QUERYS.search}${payload}`;
  } else {
    if (query.includes(QUERYS.search)) {
      const searchQuery = queryArray.find((string) =>
        string.match(QUERYS.search)
      );
      result += `&${searchQuery}`;
    }
  }

  if (type === 'itemsOnPage') {
    result += `&${QUERYS.items}${payload}`;
  } else {
    if (query.includes(QUERYS.items)) {
      const itemsOnPage = queryArray.find((string) =>
        string.match(QUERYS.items)
      );
      result += `&${itemsOnPage}`;
    }
  }

  if (type === 'details') {
    result += `&${QUERYS.details}${payload}`;
  }

  return result;
};

export { addQuery };
