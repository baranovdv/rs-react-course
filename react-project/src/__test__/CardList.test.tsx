import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Content } from '../components/Content';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext, StoreProvider } from '../context/StoreContext';
import { mockData, storeDataNotFound } from '../mocks/mockData';
import { COMMON_DATA } from '../data/data';

describe('Content', () => {
  it('renders specified number of cards', async () => {
    render(
      <StoreProvider>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </StoreProvider>
    );
    await screen.findAllByTestId('spinner');
    const content = await screen.findAllByTestId('card-item');
    expect(content).toHaveLength(mockData.results.length);
  });
  it('if no cards are present', async () => {
    render(
      <StoreProvider>
        <StoreContext.Provider value={storeDataNotFound}>
          <BrowserRouter>
            <Content />
          </BrowserRouter>
        </StoreContext.Provider>
      </StoreProvider>
    );
    await screen.findAllByTestId('spinner');
    const content = await screen.findByText(COMMON_DATA.notFound);
    expect(content).toBeInTheDocument();
  });
});
