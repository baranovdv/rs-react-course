/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { getItemsonPage } from '@/utils/getItemsOnPage';

describe('getItemsOnPage', () => {
  it('return ItemsOnPage', () => {
    const items = 42;
    const initQuery = `/?page=1&search=init&items=${items}`;

    expect(getItemsonPage(initQuery)).toBe(items);
  });
});
