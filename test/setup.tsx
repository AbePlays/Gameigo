import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import dotenv from 'dotenv';
import { afterAll, afterEach, beforeAll } from 'vitest';
import 'whatwg-fetch';

import { server } from './server/server';

dotenv.config({ path: '.env' });

beforeAll(() => server.listen());
afterEach(() => {
  // runs a cleanup after each test case (e.g. clearing jsdom)
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
