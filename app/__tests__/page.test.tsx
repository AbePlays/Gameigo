import { afterEach, describe, expect, it, vi } from 'vitest';

import { fireEvent, mockValue, render, screen } from 'test/test-utils';
import { Routes } from '../../routes';
import Home from '../page';

const mockPush = vi.fn();
const mockReplace = vi.fn();
vi.mock('next/router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    push: mockPush,
    replace: mockReplace,
  })),
}));

describe('Testing Home Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should check CTA', async () => {
    render(<Home />);
    const buttonEls = await screen.findAllByRole('button', {
      name: /get started/i,
    });
    expect(buttonEls.length).toBe(2);

    // @ts-ignore
    fireEvent.click(buttonEls[0]);
    expect(mockPush).toHaveBeenCalledWith('/home');
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('should show loader while loading data in context', () => {
    render(<Home />, { value: { ...mockValue, loaded: false } });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect to home route if user is logged in', () => {
    render(<Home />, { value: { ...mockValue } });
    expect(mockReplace).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith('/home');
  });
});
