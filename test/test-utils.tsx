import { Theme } from '@radix-ui/themes';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'next-themes';
import { vi } from 'vitest';

export const mockValue = {
  changeDisplayName: vi.fn(),
  changePassword: vi.fn(),
  loaded: true,
  loginWithEmailAndPassword: vi.fn(),
  signinWithGithub: vi.fn(),
  signinWithGoogle: vi.fn(),
  signout: vi.fn(),
  signupWithEmailAndPassword: vi.fn(),
  user: '',
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <Theme>{children}</Theme>
    </ThemeProvider>
  );
};

const customRender = (ui: JSX.Element, { value = mockValue, ...options } = {}): RenderResult => {
  return render(<Providers>{ui}</Providers>, options);
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
