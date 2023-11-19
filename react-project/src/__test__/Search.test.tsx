import { afterAll, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from '../components/Main';
import {
  getSearchQueryFromLS,
  setSearchQueryToLS,
} from '../utils/localStorage/localStorage';
import { TEST_DATA } from '../data/data';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const SEARCH_QUERY_TEST = 'testQuery';

describe('Search', () => {
  afterAll(() => {
    setSearchQueryToLS('');
  });

  it('search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );
    await screen.findAllByTestId(TEST_DATA.SPINNER);

    const searchInput: HTMLInputElement = await screen.findByTestId(
      TEST_DATA.SEARCH_INPUT
    );
    const searchButton = await screen.findByTestId(TEST_DATA.SEARCH_SUBMIT);

    fireEvent.change(searchInput, { target: { value: SEARCH_QUERY_TEST } });
    fireEvent.click(searchButton);

    await screen.findAllByTestId(TEST_DATA.SPINNER);
    await screen.findAllByTestId(TEST_DATA.SPINNER);

    expect(getSearchQueryFromLS()).toEqual(SEARCH_QUERY_TEST);
  });

  it('component retrieves the value from the local storage upon mounting', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );
    await screen.findAllByTestId(TEST_DATA.SPINNER);

    const searchInput: HTMLInputElement = await screen.findByTestId(
      TEST_DATA.SEARCH_INPUT
    );

    expect(searchInput.value).toEqual(SEARCH_QUERY_TEST);
  });
});
