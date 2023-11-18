import { afterAll, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from '../store/StoreContext';
import { Main } from '../components/Main';
import {
  getSearchQueryFromLS,
  setSearchQueryToLS,
} from '../utils/localStorage/localStorage';
import { TEST_DATA } from '../data/data';

const SEARCH_QUERY_TEST = 'testQuery';

describe('Search', () => {
  afterAll(() => {
    setSearchQueryToLS('');
  });

  it('search button saves the entered value to the local storage', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </StoreProvider>
    );
    await screen.findAllByTestId(TEST_DATA.SPINNER);

    const searchInput: HTMLInputElement = await screen.findByTestId(
      TEST_DATA.SEARCH_INPUT
    );
    const searchButton = await screen.findByTestId(TEST_DATA.SEARCH_SUBMIT);

    fireEvent.change(searchInput, { target: { value: SEARCH_QUERY_TEST } });
    fireEvent.click(searchButton);

    await screen.findAllByTestId(TEST_DATA.SPINNER);

    expect(getSearchQueryFromLS()).toEqual(SEARCH_QUERY_TEST);
  });

  it('component retrieves the value from the local storage upon mounting', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </StoreProvider>
    );
    await screen.findAllByTestId(TEST_DATA.SPINNER);

    const searchInput: HTMLInputElement = await screen.findByTestId(
      TEST_DATA.SEARCH_INPUT
    );

    expect(searchInput.value).toEqual(SEARCH_QUERY_TEST);
  });
});
