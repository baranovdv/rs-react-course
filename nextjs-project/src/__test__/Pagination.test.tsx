/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockData } from '@/mocks/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '@/mocks/createMockRouter';
import { TEST_DATA } from '@/data/data';
import { Content } from '@/components/Content';

describe('Pagination', () => {
  it('component updates URL query parameter when next page clicked', () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Content data={mockData} />
      </RouterContext.Provider>
    );
    const nextPage = screen.getAllByTestId(TEST_DATA.NEXT_PAGE);

    fireEvent.click(nextPage[0]);
    expect(router.push).toHaveBeenCalledWith('/?page=2');
  });
  it('component updates URL query parameter when prev page clicked', () => {
    const router = createMockRouter({ query: { page: '4' } });
    render(
      <RouterContext.Provider value={router}>
        <Content data={mockData} />
      </RouterContext.Provider>
    );
    const prevPage = screen.getAllByTestId(TEST_DATA.PREV_PAGE);

    fireEvent.click(prevPage[0]);
    expect(router.push).toHaveBeenCalledWith('/?page=3');
  });
});
