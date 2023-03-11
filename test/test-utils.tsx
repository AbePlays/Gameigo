import { ChakraProvider } from '@chakra-ui/react';
import { User } from '@lib/types';
import '@testing-library/jest-dom';
import { render, RenderResult } from '@testing-library/react';

import { AuthContext } from '../lib/auth';

export const mockUser: User = {
  uid: 'some uid',
  email: 'michaelscott@dundermifflin.com',
  name: 'Michael Scott',
  provider: 'Dunder Mifflin',
  photoUrl: 'some url',
};

export const mockValue = {
  changeDisplayName: jest.fn(),
  changePassword: jest.fn(),
  loaded: true,
  loginWithEmailAndPassword: jest.fn(),
  signinWithGithub: jest.fn(),
  signinWithGoogle: jest.fn(),
  signout: jest.fn(),
  signupWithEmailAndPassword: jest.fn(),
  user: null,
};

const Providers = ({ children, value }) => {
  return (
    <ChakraProvider>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </ChakraProvider>
  );
};

const customRender = (ui: JSX.Element, { value = mockValue, ...options } = {}): RenderResult => {
  return render(<Providers value={value}>{ui}</Providers>, options);
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
