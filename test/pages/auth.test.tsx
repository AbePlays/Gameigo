import { describe, expect, it, vi } from 'vitest';

import Auth from '../../app/auth/page';
import { fireEvent, mockValue, render, screen } from '../test-utils';

const mockReplace = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe('Testing Auth Component', () => {
  it('should check for CTA', () => {
    render(<Auth searchParams={{}} />);
    let button = screen.getByRole('button', { name: /sign up/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    button = screen.getByRole('button', { name: /log in/i });
    expect(button).toBeInTheDocument();
  });

  it('should redirect to home screen if user is logged in', () => {
    render(<Auth searchParams={{}} />, { value: { ...mockValue } });

    expect(mockReplace).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/home');
  });
});
