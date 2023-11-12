import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { mockData } from '../mocks/mockData';
import { TEST_DATA } from '../data/data';
import { routerConfig } from '../router/router';

describe('Detailed Card', () => {
  it('loading indicator is displayed while fetching data', async () => {
    const router = createMemoryRouter(routerConfig);
    render(
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    );
    await screen.findByTestId(TEST_DATA.SPINNER);
    const cards = screen.getAllByTestId(TEST_DATA.CARD);
    const cardButton = cards[0].getElementsByTagName('button');

    const details = screen.queryByTestId(TEST_DATA.DETAILS);
    expect(details).toBeNull();

    fireEvent.click(cardButton[0]);
    const spinner = screen.getByTestId(TEST_DATA.SPINNER);
    expect(spinner).toBeInTheDocument();
  });
  it('detailed card component correctly displays the detailed card data', async () => {
    const router = createMemoryRouter(routerConfig);
    render(
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    );
    await screen.findByTestId(TEST_DATA.SPINNER);
    const cards = screen.getAllByTestId(TEST_DATA.CARD);
    const cardButton = cards[0].getElementsByTagName('button');

    let details = screen.queryByTestId(TEST_DATA.DETAILS);
    expect(details).toBeNull();

    fireEvent.click(cardButton[0]);
    await screen.findByTestId(TEST_DATA.SPINNER);

    details = screen.getByTestId(TEST_DATA.DETAILS);

    const detailsImg = details.getElementsByTagName('img');
    expect(detailsImg[0].src).toBe(mockData.results[0].image);

    const detailsName = details.getElementsByTagName('h2');
    expect(detailsName[0].textContent).toBe(mockData.results[0].name);

    const detailsInfo = details.getElementsByTagName('h3');

    expect(detailsInfo[0].textContent?.split(' ')[1]).toBe(
      mockData.results[0].species
    );
    expect(detailsInfo[1].textContent?.split(' ')[1]).toBe(
      mockData.results[0].gender
    );
    expect(detailsInfo[2].textContent?.split(' ')[1]).toBe(
      mockData.results[0].status
    );
    expect(detailsInfo[3].textContent?.split(' ')[1]).toBe(
      mockData.results[0].origin.name.split(' ')[0]
    );
    expect(detailsInfo[4].textContent?.split(' ')[1]).toBe(
      mockData.results[0].location.name.split(' ')[0]
    );

    expect(detailsInfo[5].textContent?.split(' ')[1]).toBe(
      mockData.results[0].episode[0]
    );
  });
  it('clicking the close button hides the component', async () => {
    const router = createMemoryRouter(routerConfig);
    render(
      <StoreProvider>
        <RouterProvider router={router} />
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

    const closeButton = screen.getByTestId(TEST_DATA.ASIDE_BUTTON_CLOSE);
    fireEvent.click(closeButton);
    details = screen.queryByTestId(TEST_DATA.DETAILS);
    expect(details).toBeNull();
  });
});
