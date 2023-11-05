import { afterEach, describe, expect, it, vi } from 'vitest';

import Protected from '@containers/Protected';
import { Routes } from 'routes';
import { mockUser, mockValue, render, screen } from '../../test-utils';

const mockPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    push: mockPush,
  })),
}));

describe('Testing Protected Container', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should show loader if loading is true inside context', () => {
    render(<Protected />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

    render(<Protected />, {
      value: { ...mockValue, loaded: false },
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect if user is not logged in', () => {
    render(<Protected />);
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(Routes.AUTH_SCREEN);
  });

  it('should not redirect if user is logged in', () => {
    render(
      <Protected>
        <span>Dunder Mifflin</span>
      </Protected>,
      { value: { ...mockValue, user: mockUser } }
    );

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should render children if user is logged in', () => {
    render(
      <Protected>
        <span>Dunder Mifflin</span>
      </Protected>
    );
    expect(screen.queryByText('Dunder Mifflin')).not.toBeInTheDocument();

    render(
      <Protected>
        <span>Dunder Mifflin</span>
      </Protected>,
      { value: { ...mockValue, user: mockUser } }
    );

    expect(screen.getByText('Dunder Mifflin')).toBeInTheDocument();
  });
});
