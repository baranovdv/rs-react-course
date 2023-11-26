/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { addQuery } from '@/utils/addQuery';

describe('addQuery', () => {
  it('page change', () => {
    const page = '42';
    const initQuery = '/?page=1&search=init&items=20';
    expect(addQuery(initQuery, 'page', page)).toBe(
      `/?page=${page}&search=init&items=20`
    );
  });
  it('search change', () => {
    const search = 'testsearch';
    const initQuery = '/?page=1&search=init&items=20';
    expect(addQuery(initQuery, 'search', search)).toBe(
      `/?page=1&search=${search}&items=20`
    );
  });
  it('items change', () => {
    const items = '5';
    const initQuery = '/?page=1&search=init&items=20';
    expect(addQuery(initQuery, 'itemsOnPage', items)).toBe(
      `/?page=1&search=init&items=${items}`
    );
  });
});
