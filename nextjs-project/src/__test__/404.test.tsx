/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TEST_DATA } from '@/data/data';
import ErrorPage from '@/pages/404';

describe('404', () => {
  it('render 404 page', () => {
    render(<ErrorPage />);
    const img404 = screen.getByTestId(TEST_DATA.IMG_404);
    expect(img404).toBeInTheDocument();
  });
});
