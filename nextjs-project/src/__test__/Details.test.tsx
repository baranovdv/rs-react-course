/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockData } from '@/mocks/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '@/mocks/createMockRouter';
import { COMMON_DATA, TEST_DATA } from '@/data/data';
import { Aside } from '@/components/Aside';

describe('Details', () => {
  it('detailed card component correctly displays the detailed card data', async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Aside data={mockData.results[0]} />
      </RouterContext.Provider>
    );
    const details = screen.getByTestId(TEST_DATA.DETAILS);

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
  it('if no card is present', async () => {
    const router = createMockRouter({});
    render(
      <RouterContext.Provider value={router}>
        <Aside data={null} />
      </RouterContext.Provider>
    );
    const content = screen.getByText(COMMON_DATA.notFound);
    expect(content).toBeInTheDocument();
  });
});
