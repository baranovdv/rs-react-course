import { useRef, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { COMMON_DATA } from '../data/data';
import Content from './Content';
import Menu from './Menu';

export default function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsOnPage = useRef(COMMON_DATA.defaultItemsOnPage);

  const onSubmitHandler = (searchInput: string) => {
    searchParams.set(COMMON_DATA.pageURLQuery, '1');
    setSearchParams(searchParams);
    setSearchQuery(searchInput);
  };

  return (
    <main className="py-4 px-5 bg-slate-300">
      <Menu onSubmitHandler={onSubmitHandler} itemsOnPage={itemsOnPage}></Menu>
      <Content query={searchQuery} itemsOnPage={itemsOnPage.current}></Content>
      <Outlet />
    </main>
  );
}
