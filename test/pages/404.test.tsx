import { describe, expect, it, vi } from 'vitest';

import ErrorPage from 'app/not-found';
import { fireEvent, render, screen } from '../test-utils';

const mockReplace = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe('Testing 404 page', () => {
  it('should check go home button', () => {
    render(<ErrorPage />);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent(/return to home/i);

    fireEvent.click(buttonEl);
    expect(mockReplace).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/home');
  });
});
