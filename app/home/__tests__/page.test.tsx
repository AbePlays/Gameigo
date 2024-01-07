import { describe, expect, it } from 'vitest';

import HomePage from 'app/home/page';
import { render, screen } from 'test/test-utils';

describe('Testing Home Page', () => {
  it('should display the correct title', () => {
    render(<HomePage />);
    expect(screen.getByText(/new and trending/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Forza Horizon 5' })).toBeInTheDocument();
  });
});
