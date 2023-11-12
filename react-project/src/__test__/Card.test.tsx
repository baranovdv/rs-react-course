import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { Main } from '../components/Main';
import { Aside } from '../components/Aside';
import { clearIsAPICalled, isAPICalled } from '../mocks/handlers';
import { TEST_DATA } from '../data/data';

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
    await screen.findByTestId(TEST_DATA.SPINNER);
    const cards = screen.getAllByTestId(TEST_DATA.CARD);
    const cardButton = cards[0].getElementsByTagName('button');

    let details = screen.queryByTestId(TEST_DATA.DETAILS);
    expect(details).toBeNull();

    fireEvent.click(cardButton[0]);
    await screen.findByTestId(TEST_DATA.SPINNER);

    details = screen.queryByTestId(TEST_DATA.DETAILS);
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
    await screen.findByTestId(TEST_DATA.SPINNER);
    const cards = screen.getAllByTestId(TEST_DATA.CARD);
    const cardButton = cards[0].getElementsByTagName('button');

    clearIsAPICalled();

    fireEvent.click(cardButton[0]);
    await screen.findByTestId(TEST_DATA.SPINNER);
    expect(isAPICalled).toBeTruthy();

    clearIsAPICalled();
  });
});
