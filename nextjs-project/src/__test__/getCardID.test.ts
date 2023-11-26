/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import { getCardID } from '@/utils/getCardID';

describe('getCardID', () => {
  it('return cardID', () => {
    const id = 42;
    const initQuery = `/?page=1&search=init&items=20&details=${id}`;

    expect(getCardID(initQuery)).toBe(id);
  });
});
