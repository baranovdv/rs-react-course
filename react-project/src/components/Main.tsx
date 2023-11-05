import { useEffect, useRef, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { COMMON_DATA, ERROR_DATA } from '../data/data';
import Content from './Content';
import Menu from './Menu';

export default function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsOnPage = useRef(
    Number(localStorage.getItem(COMMON_DATA.localStorageItemsOnPage)) ||
      COMMON_DATA.defaultItemsOnPage
  );

  const onSubmitHandler = (searchInput: string) => {
    searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
    setSearchParams(searchParams);
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    const currentQuery = Number(
      searchParams.get(COMMON_DATA.pageURLQuery) || ERROR_DATA.pageError
    );
    if (currentQuery === ERROR_DATA.pageError) {
      searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <main className="py-4 px-5 bg-slate-300">
      <Menu onSubmitHandler={onSubmitHandler} itemsOnPage={itemsOnPage}></Menu>
      <Content query={searchQuery} itemsOnPage={itemsOnPage.current}></Content>
      <Outlet />
    </main>
  );
}
