import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getSearchQueryFromLS,
  setItemsOnPageToLS,
} from '../utils/localStorage/localStorage';
import { COMMON_DATA, MENU_DATA, TEST_DATA } from '../data/data';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectItemsOnPage,
  setItemsOnPage,
  setSearchQuery,
} from '../store/cardsSlice';

const Menu: FC = () => {
  const itemsOnPage = useAppSelector(selectItemsOnPage);

  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    setSearchInput(getSearchQueryFromLS());
  }, []);

  const handleSearchFormSubmit = (
    event: React.FormEvent<HTMLElement>
  ): void => {
    event.preventDefault();
    searchParams.set(COMMON_DATA.pageURLQuery, COMMON_DATA.startPage);
    setSearchParams(searchParams);

    dispatch(setSearchQuery(searchInput));
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch(setItemsOnPage(Number(event.target.value)));
    setItemsOnPageToLS(event.target.value);

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
            testId={TEST_DATA.SEARCH_INPUT}
          />
          <Button
            testId={TEST_DATA.SEARCH_SUBMIT}
            onClick={handleSearchFormSubmit}
          >
            Search
          </Button>
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
