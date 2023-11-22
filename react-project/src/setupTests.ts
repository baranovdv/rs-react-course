import '@testing-library/jest-dom/vitest';
import { act } from 'react-dom/test-utils';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import { beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { rickAndMortyAPI } from './API/rickAndMortyAPI';
import { server } from './mocks/server';
import { store } from './store/store';

beforeAll(() => server.listen());
beforeEach(async () => {
  await act(async () => {
    store.dispatch(rickAndMortyAPI.util.resetApiState());
    await delay(500);
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
