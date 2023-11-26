/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { type ParsedUrlQuery } from 'querystring';
import { createRequest } from '@/utils/createRequest';
import { QUERYS } from '@/data/data';

describe('createRequest', () => {
  it('convert ParsedUrlQuery to string', () => {
    const testPageNum = '22';
    const testSearch = 'test';

    const URLRequest: ParsedUrlQuery = {
      page: testPageNum,
      search: testSearch,
    };
    expect(createRequest(URLRequest)).toBe(
      `?${QUERYS.page}${testPageNum}&name=${testSearch}`
    );
  });
  it('return empty string on wrong input', () => {
    expect(createRequest(undefined)).toBe('');
  });
});
