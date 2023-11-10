import { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getSearchQueryFromLS,
  setItemsOnPageToLS,
} from '../utils/localStorage/localStorage';
import { COMMON_DATA, MENU_DATA } from '../data/data';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { SearchQueryContext } from '../context/SearchQueryContext';

interface MenuProps {
  itemsOnPage: number;
}

const Menu: FC<MenuProps> = ({ itemsOnPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>('');

  const { updateSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    setSearchInput(getSearchQueryFromLS());
  }, []);

  const handleSearchFormSubmit = (
    event: React.FormEvent<HTMLElement>
  ): void => {
    event.preventDefault();
    searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
    setSearchParams(searchParams);
    updateSearchQuery(searchInput);
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    itemsOnPage = Number(event.target.value);
    setItemsOnPageToLS(itemsOnPage);

    searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <form
          className="flex flex-none gap-5 md:flex-1 "
          onSubmit={handleSearchFormSubmit}
        >
          <Input
            value={searchInput}
            setValue={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchInput(event.target.value)
            }
            label={COMMON_DATA.inputLabel}
          />
          <Button onClick={handleSearchFormSubmit}>Search</Button>
        </form>
        <Select
          data={MENU_DATA}
          selected={itemsOnPage}
          onSelect={handleSelectChange}
        />
      </div>

      <hr className="mt-[10px] mb-[20px] bg-[rgb(100,116,139)] h-[4px]" />
    </>
  );
};

export { Menu };
