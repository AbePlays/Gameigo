import { describe, expect, it, vi } from 'vitest';

import FavoritesPage from 'app/favorites/Favorites';
import { mockValue, render, screen, waitFor } from '../test-utils';

// TODO: Improve this test

const mockPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Testing Favorites Page', () => {
  it('should redirect to auth page if user is not logged in', async () => {
    render(<FavoritesPage />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledTimes(1);
      expect(mockPush).toHaveBeenCalledWith('/auth');
    });
  });

  it('should render page', async () => {
    render(<FavoritesPage />, { value: { ...mockValue } });
    await waitFor(() => {
      expect(screen.getByText('Favorites')).toBeInTheDocument();
    });
  });
});
