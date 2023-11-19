import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { clearIsAPICalled, isAPICalled } from '../mocks/handlers';
import { TEST_DATA } from '../data/data';
import { routerConfig } from '../router/router';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Card', () => {
  it('clicking on a card opens a detailed card component', async () => {
    const router = createMemoryRouter(routerConfig);
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    await screen.findByTestId(TEST_DATA.SPINNER);
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
    const router = createMemoryRouter(routerConfig);
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    await screen.findByTestId(TEST_DATA.SPINNER);
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
