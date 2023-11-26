import { ERROR_DATA, QUERYS } from '@/data/data';

const getCardID = (query: string): number => {
  let id = ERROR_DATA.noID;

  if (query.includes(QUERYS.details)) {
    const idURL = query
      .split('&')
      .find((string) => string.match(QUERYS.details));
    if (idURL) id = idURL.slice(QUERYS.details.length);
  }

  return Number(id);
};

export { getCardID };
