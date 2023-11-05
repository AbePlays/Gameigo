import { ChakraProvider } from '@chakra-ui/react';
import { User } from '@lib/types';
import { render, RenderResult } from '@testing-library/react';
import { vi } from 'vitest';

import { AuthContext } from '../lib/auth';

export const mockUser: User = {
  uid: 'some uid',
  email: 'michaelscott@dundermifflin.com',
  name: 'Michael Scott',
  provider: 'Dunder Mifflin',
  photoUrl: 'some url',
};

export const mockValue = {
  changeDisplayName: vi.fn(),
  changePassword: vi.fn(),
  loaded: true,
  loginWithEmailAndPassword: vi.fn(),
  signinWithGithub: vi.fn(),
  signinWithGoogle: vi.fn(),
  signout: vi.fn(),
  signupWithEmailAndPassword: vi.fn(),
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
