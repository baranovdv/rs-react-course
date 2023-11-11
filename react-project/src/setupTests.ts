import '@testing-library/jest-dom/vitest';
// import matchers from '@testing-library/jest-dom/matchers';
// import { expect } from 'vitest';

// expect.extend(matchers);

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
