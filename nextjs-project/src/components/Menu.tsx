import { addQuery } from '@/utils/addQuery';
import { getItemsonPage } from '@/utils/getItemsOnPage';
import { getSearchQuery } from '@/utils/getSearchQuery';
import { useRouter } from 'next/router';
import { encode } from 'querystring';
import { type ChangeEvent, type FC, useState, useTransition } from 'react';
import { COMMON_DATA, MENU_DATA, TEST_DATA } from '../data/data';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';

const Menu: FC = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const parsedURLQueryParams = encode(router.query);
  const itemsOnPage = getItemsonPage(parsedURLQueryParams);

  const [searchInput, setSearchInput] = useState<string>(
    getSearchQuery(parsedURLQueryParams)
  );

  const handleSearchFormSubmit = (
    event: React.FormEvent<HTMLElement>
  ): void => {
    event.preventDefault();

    let query = addQuery(parsedURLQueryParams, 'page', COMMON_DATA.startPage);
    query = addQuery(query, 'search', searchInput);

    startTransition(async () => {
      await router.push(query);
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    let query = addQuery(parsedURLQueryParams, 'page', COMMON_DATA.startPage);
    query = addQuery(query, 'itemsOnPage', event.target.value);

    startTransition(async () => {
      await router.push(query);
    });
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
            setValue={(event: ChangeEvent<HTMLInputElement>) => {
              setSearchInput(event.target.value);
            }}
            label={COMMON_DATA.inputLabel}
            testId={TEST_DATA.SEARCH_INPUT}
            disabled={isPending}
          />
          <Button
            testId={TEST_DATA.SEARCH_SUBMIT}
            type="submit"
            disabled={isPending}
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
