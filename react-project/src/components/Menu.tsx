import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getSearchQueryFromLS,
  setItemsOnPageToLS,
} from '../utils/localStorage/localStorage';
import { COMMON_DATA, MENU_DATA } from '../data/data';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { useStore, useStoreDispatch } from '../context/StoreContext';

const Menu: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>('');

  const store = useStore();

  const dispatch = useStoreDispatch();

  useEffect(() => {
    setSearchInput(getSearchQueryFromLS());
  }, []);

  const handleSearchFormSubmit = (
    event: React.FormEvent<HTMLElement>
  ): void => {
    event.preventDefault();
    searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
    setSearchParams(searchParams);

    dispatch({
      type: 'submit_search_query',
      searchQuery: searchInput,
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    store.itemsOnPage = Number(event.target.value);
    setItemsOnPageToLS(store.itemsOnPage);

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
            testId="search-input-item"
          />
          <Button
            testId="search-button-submit"
            onClick={handleSearchFormSubmit}
          >
            Search
          </Button>
        </form>
        <Select
          data={MENU_DATA}
          selected={store.itemsOnPage}
          onSelect={handleSelectChange}
        />
      </div>

      <hr className="mt-[10px] mb-[20px] bg-[rgb(100,116,139)] h-[4px]" />
    </>
  );
};

export { Menu };
