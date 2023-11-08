import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getSearchQueryFromLS,
  setSearchQueryFromLS,
} from '../utils/localStorage/localStorage';
import { COMMON_DATA, MENU_DATA } from '../data/data';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

interface MenuProps {
  onSubmitHandler: (searchInput: string) => void;
  itemsOnPage: number;
}

const Menu: FC<MenuProps> = ({ onSubmitHandler, itemsOnPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    setSearchInput(getSearchQueryFromLS());
  }, []);

  const handleSearchFormSubmit = (
    event: React.FormEvent<HTMLElement>
  ): void => {
    event.preventDefault();
    onSubmitHandler(searchInput);
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    itemsOnPage = Number(event.target.value);
    setSearchQueryFromLS(itemsOnPage);

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
};

export { Menu };
