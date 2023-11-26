/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { getSearchQuery } from '@/utils/getSearchQuery';

describe('getSearchQuery', () => {
  it('return searchQuery', () => {
    const testQuery = 'testQuery';
    const initQuery = `/?page=1&search=${testQuery}&items=20`;

    expect(getSearchQuery(initQuery)).toBe(testQuery);
  });
});
