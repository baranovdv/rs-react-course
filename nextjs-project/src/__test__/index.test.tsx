/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/pages/index';
import { mockData } from '@/mocks/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '@/mocks/createMockRouter';
import { COMMON_DATA, TEST_DATA } from '@/data/data';
import { QueryStatus } from '@reduxjs/toolkit/query';

describe('Home', () => {
  it('renders specified number of cards', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home response={mockData} />
      </RouterContext.Provider>
    );
    const content = screen.getAllByTestId(TEST_DATA.CARD);
    expect(content).toHaveLength(mockData.results.length);
  });
  it('if no cards are present', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home response={null} status={QueryStatus.rejected} />
      </RouterContext.Provider>
    );
    const content = screen.getByText(COMMON_DATA.notFound);
    expect(content).toBeInTheDocument();
  });
  it('card component renders the relevant card data', () => {
    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Home response={mockData} />
      </RouterContext.Provider>
    );
    const card = screen.getAllByTestId(TEST_DATA.CARD);

    for (let i = 0; i < mockData.results.length; i++) {
      const cardImg = card[i].getElementsByTagName('img');
      expect(cardImg[0].src).toBe(mockData.results[i].image);

      const cardName = card[i].getElementsByTagName('h2');
      expect(cardName[0].textContent).toBe(mockData.results[i].name);

      const cardInfo = card[i].getElementsByTagName('h3');

      expect(cardInfo[0].textContent?.split(' ')[1]).toBe(
        mockData.results[0].species
      );
      expect(cardInfo[1].textContent?.split(' ')[1]).toBe(
        mockData.results[i].gender
      );
      expect(cardInfo[2].textContent?.split(' ')[1]).toBe(
        mockData.results[i].status
      );
      expect(cardInfo[3].textContent?.split(' ')[1]).toBe(
        mockData.results[i].origin.name.split(' ')[0]
      );
    }
  });
});
