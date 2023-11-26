/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockData } from '@/mocks/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '@/mocks/createMockRouter';
import { TEST_DATA } from '@/data/data';
import Main from '@/components/Main';

const SEARCH_QUERY_TEST = 'testQuery';

describe('Menu', () => {
  it('after click on select button url changes with input value', () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Main data={mockData} />
      </RouterContext.Provider>
    );
    const searchInput: HTMLInputElement = screen.getByTestId(
      TEST_DATA.SEARCH_INPUT
    );
    const searchButton = screen.getByTestId(TEST_DATA.SEARCH_SUBMIT);

    fireEvent.change(searchInput, { target: { value: SEARCH_QUERY_TEST } });
    fireEvent.click(searchButton);
    expect(router.push).toHaveBeenCalledWith(
      `/?page=1&search=${SEARCH_QUERY_TEST}`
    );
  });
});
