import { COMMON_DATA, QUERYS } from '@/data/data';

const getPage = (query: string): number => {
  let pageNum = COMMON_DATA.startPage;

  if (query.includes(QUERYS.page)) {
    const queryPageNum = query.match(/[0-9]+/g);
    pageNum = queryPageNum ? queryPageNum[0] : COMMON_DATA.startPage;
  }

  return Number(pageNum);
};

export { getPage };
