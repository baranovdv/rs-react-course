import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from '../context/StoreContext';
import { Main } from '../components/Main';
import { Aside } from '../components/Aside';
import { mockData } from '../mocks/mockData';

describe('Detailed Card', () => {
  it('loading indicator is displayed while fetching data', async () => {
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

    const details = screen.queryByTestId('details-item');
    expect(details).toBeNull();

    fireEvent.click(cardButton[0]);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
  it('detailed card component correctly displays the detailed card data', async () => {
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

    details = screen.getByTestId('details-item');

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

    const closeButton = screen.getByTestId('aside-button-close');
    fireEvent.click(closeButton);
    details = screen.queryByTestId('details-item');
    expect(details).toBeNull();
  });
});
