import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COMMON_DATA, MENU_DATA } from '../data/data';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import Select from './ui/Select';

interface MenuProps {
  onSubmitHandler: (searchInput: string) => void;
  itemsOnPage: React.MutableRefObject<number>;
}

export default function Menu({ onSubmitHandler, itemsOnPage }: MenuProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchButton = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();
    onSubmitHandler(searchInput);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    itemsOnPage.current = Number(e.target.value);
    localStorage.setItem(
      COMMON_DATA.localStorageItemsOnPage,
      itemsOnPage.current.toString() ||
        COMMON_DATA.defaultItemsOnPage.toString()
    );
    searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setSearchInput(localStorage.getItem(COMMON_DATA.localStorageQuery) || '');
  }, []);

  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <form
          className="flex flex-none gap-5 md:flex-1 "
          onSubmit={handleSearchButton}
        >
          <Input
            value={searchInput}
            setValue={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchInput(e.target.value)
            }
            label={COMMON_DATA.inputLabel}
          />
          <Button onClick={handleSearchButton}>Search</Button>
        </form>
        <Select
          data={MENU_DATA}
          selected={itemsOnPage.current}
          onSelect={handleSelect}
        />
      </div>

      <hr
        style={{
          marginTop: '10px',
          marginBottom: '20px',
          background: 'rgb(100,116,139)',
          height: '4px',
        }}
      />
    </>
  );
}
