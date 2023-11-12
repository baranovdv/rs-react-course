import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { Main } from '../components/Main';
import { Aside } from '../components/Aside';
import { clearIsAPICalled, isAPICalled } from '../mocks/handlers';

describe('Card', () => {
  it('clicking on a card opens a detailed card component', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/details/:id" element={<Aside />} />
          </Routes>
        </MemoryRouter>
      </StoreProvider>
    );
    await screen.findByTestId('spinner');
    const cards = screen.getAllByTestId('card-item');
    const cardButton = cards[0].getElementsByTagName('button');

    let details = screen.queryByTestId('details-item');
    expect(details).toBeNull();

    fireEvent.click(cardButton[0]);
    await screen.findByTestId('spinner');

    details = screen.queryByTestId('details-item');
    expect(details).toBeInTheDocument();
  });
  it('clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <StoreProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/details/:id" element={<Aside />} />
          </Routes>
        </MemoryRouter>
      </StoreProvider>
    );
    await screen.findByTestId('spinner');
    const cards = screen.getAllByTestId('card-item');
    const cardButton = cards[0].getElementsByTagName('button');

    clearIsAPICalled();

    fireEvent.click(cardButton[0]);
    await screen.findByTestId('spinner');
    expect(isAPICalled).toBeTruthy();

    clearIsAPICalled();
  });
});
