import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Content } from '../components/Content';
import { MemoryRouter } from 'react-router-dom';
import { mockData } from '../mocks/mockData';
import { COMMON_DATA, TEST_DATA } from '../data/data';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { mockStore } from '../mocks/mockStore';

describe('Content', () => {
  it('renders specified number of cards', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Content />
        </MemoryRouter>
      </Provider>
    );
    await screen.findAllByTestId(TEST_DATA.SPINNER);
    const content = await screen.findAllByTestId(TEST_DATA.CARD);
    expect(content).toHaveLength(mockData.results.length);
  });
  it('if no cards are present', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Content />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByTestId(TEST_DATA.SPINNER);

    const content = await screen.findByText(COMMON_DATA.notFound);
    expect(content).toBeInTheDocument();
  });
  it('card component renders the relevant card data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Content />
        </MemoryRouter>
      </Provider>
    );
    await screen.findByTestId(TEST_DATA.SPINNER);
    const card = await screen.findAllByTestId(TEST_DATA.CARD);

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
