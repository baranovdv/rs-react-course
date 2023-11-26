import { COMMON_DATA, QUERYS } from '@/data/data';

const getItemsonPage = (query: string): number => {
  let itemsOnPage = COMMON_DATA.defaultItemsOnPage.toString();

  if (query.includes(QUERYS.items)) {
    const itemsOnPageURL = query
      .split('&')
      .find((string) => string.match(QUERYS.items));
    if (itemsOnPageURL) itemsOnPage = itemsOnPageURL.slice(QUERYS.items.length);
  }

  return Number(itemsOnPage);
};

export { getItemsonPage };
