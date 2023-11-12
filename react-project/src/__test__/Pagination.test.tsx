import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import * as reactRouterDom from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Content } from '../components/Content';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { useState } from 'react';
import { COMMON_DATA, TEST_DATA } from '../data/data';

let searchParamsMock = '';

type SetParams = ReturnType<typeof reactRouterDom.useSearchParams>['1'];

const useSearchParamsMock: typeof reactRouterDom.useSearchParams = () => {
  const location = reactRouterDom.useLocation();
  const [params, setParams] = useState<URLSearchParams>(
    new URLSearchParams(searchParamsMock || location.search)
  );

  searchParamsMock =
    searchParamsMock === ''
      ? new URLSearchParams(location.search).get(COMMON_DATA.pageURLQuery) || ''
      : searchParamsMock;

  const setParamsMock: SetParams = (newParams) => {
    const newSearchParams = reactRouterDom.createSearchParams(
      typeof newParams === 'function' ? newParams(params) : newParams
    );
    searchParamsMock = newSearchParams.get(COMMON_DATA.pageURLQuery) || '';
    setParams(newSearchParams);
  };

  return [params, setParamsMock];
};

describe('Pagination', () => {
  beforeAll(() => {
    vi.spyOn(reactRouterDom, 'useSearchParams').mockImplementation(
      useSearchParamsMock
    );
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('component updates URL query parameter when page changes', async () => {
    render(
      <StoreProvider>
        <MemoryRouter initialEntries={['/?page=1']}>
          <Content />
        </MemoryRouter>
      </StoreProvider>
    );
    await screen.findAllByTestId(TEST_DATA.SPINNER);
    let nextPage = await screen.findAllByTestId(TEST_DATA.NEXT_PAGE);
    let currentPage = Number(searchParamsMock);

    fireEvent.click(nextPage[0]);
    currentPage = currentPage + 1;
    expect(Number(searchParamsMock)).toBe(currentPage);

    nextPage = await screen.findAllByTestId(TEST_DATA.NEXT_PAGE);
    fireEvent.click(nextPage[0]);
    currentPage = currentPage + 1;
    expect(Number(searchParamsMock)).toBe(currentPage);

    const prevPage = await screen.findAllByTestId(TEST_DATA.PREV_PAGE);
    fireEvent.click(prevPage[0]);
    currentPage = currentPage - 1;
    expect(Number(searchParamsMock)).toBe(currentPage);
  });
});
