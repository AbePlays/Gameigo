/* eslint-disable @next/next/no-img-element */
import '@testing-library/jest-dom/extend-expect';
import dotenv from 'dotenv';
import 'whatwg-fetch';

import { server } from 'test/server/server';

dotenv.config({ path: '.env.local' });

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('firebase/firestore', () => {
  return { getFirestore: jest.fn() };
});

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    const { src = '' } = props;
    return <img alt="" src={src} />;
  },
}));

jest.mock('next/link', () => {
  const React = require('react');

  return ({ children, href }) =>
    React.cloneElement(React.Children.only(children), { href });
});
