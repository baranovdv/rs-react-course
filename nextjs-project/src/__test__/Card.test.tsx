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

describe('Card', () => {
  it('clicking on a card opens a detailed card component', () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Main data={mockData} />
      </RouterContext.Provider>
    );
    const cards = screen.getAllByTestId(TEST_DATA.CARD);
    const cardButton = cards[0].getElementsByTagName('button');

    fireEvent.click(cardButton[0]);
    expect(router.push).toHaveBeenCalledWith('/?page=1&details=1');
  });
});
