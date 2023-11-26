import { COMMON_DATA, MENU_DATA, NUM_OF_API_ITEMS, QUERYS } from '@/data/data';
import { encode, type ParsedUrlQuery } from 'querystring';

const createRequest = (urlQuery: ParsedUrlQuery | undefined): string => {
  if (!urlQuery) return '';

  const parsedURLQueryParams = encode(urlQuery);
  const queryArray = parsedURLQueryParams.split('&');

  let pageNum = COMMON_DATA.startPage;
  let searchQuery = '';
  let itemsOnPage = COMMON_DATA.defaultItemsOnPage;

  if (parsedURLQueryParams.includes(QUERYS.page)) {
    const pageURL = queryArray.find((string) => string.match(QUERYS.page));

    pageNum = pageURL
      ? pageURL.slice(QUERYS.page.length)
      : COMMON_DATA.startPage;
    pageNum = isFinite(+pageNum) ? pageNum : COMMON_DATA.startPage;
  }

  if (parsedURLQueryParams.includes(QUERYS.items)) {
    const itemsURL = queryArray.find((string) => string.match(QUERYS.items));

    itemsOnPage = itemsURL
      ? +itemsURL.slice(QUERYS.items.length)
      : COMMON_DATA.defaultItemsOnPage;

    itemsOnPage = isFinite(itemsOnPage)
      ? itemsOnPage
      : COMMON_DATA.defaultItemsOnPage;

    itemsOnPage = MENU_DATA.selectOptions.includes(itemsOnPage)
      ? itemsOnPage
      : COMMON_DATA.defaultItemsOnPage;
  }

  if (parsedURLQueryParams.includes(QUERYS.search)) {
    const searchQueryURL = queryArray.find((string) =>
      string.match(QUERYS.search)
    );
    searchQuery = `&name=${searchQueryURL?.slice(QUERYS.search.length)}`;
  }

  pageNum = Math.ceil((+pageNum * itemsOnPage) / NUM_OF_API_ITEMS).toString();
  const request = `?${QUERYS.page}${pageNum}${searchQuery}`;

  return request;
};

export { createRequest };
