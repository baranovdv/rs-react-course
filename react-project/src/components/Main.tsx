import { FC, useEffect, useRef, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import {
  getItemsOnPageFromLS,
  getSearchQueryFromLS,
} from '../utils/localStorage/localStorage';
import { COMMON_DATA, ERROR_DATA } from '../data/data';
import { Content } from './Content';
import { Menu } from './Menu';

const Main: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState<string>(
    getSearchQueryFromLS()
  );

  const itemsOnPage = useRef<number>(getItemsOnPageFromLS());

  const handleMenuSubmit = (searchInput: string) => {
    searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
    setSearchParams(searchParams);
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    const currentQuery = Number(
      searchParams.get(COMMON_DATA.pageURLQuery) || ERROR_DATA.pageError
    );

    const isPageError = currentQuery === ERROR_DATA.pageError;

    if (isPageError) {
      searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <main className="py-4 px-5 bg-slate-300">
      <Menu
        onSubmitHandler={handleMenuSubmit}
        itemsOnPage={itemsOnPage.current}
      ></Menu>
      <Content query={searchQuery} itemsOnPage={itemsOnPage.current}></Content>
      <Outlet />
    </main>
  );
};

export { Main };
