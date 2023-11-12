import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routerConfig } from '../router/router';
import { TEST_DATA } from '../data/data';

describe('404 Page component', () => {
  it('404 page is displayed when navigating to an invalid route', async () => {
    const router = createMemoryRouter(routerConfig, {
      initialEntries: ['/noway'],
    });
    render(<RouterProvider router={router} />);
    const img404 = screen.getByTestId(TEST_DATA.IMG_404);
    expect(img404).toBeInTheDocument();
  });
});
