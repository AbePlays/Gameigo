import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AuthProvider } from '../lib/auth';

const Providers = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const customRender = (ui: JSX.Element, options = {}): RenderResult =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
