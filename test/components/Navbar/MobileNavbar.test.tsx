import { describe, expect, it, vi } from 'vitest';

import MobileNavbar from '@components/Navbar/MobileNavbar';
import { fireEvent, render, screen } from '../../test-utils';

const mockPush = vi.fn();
vi.mock('next/router', () => ({
  useRouter: vi.fn().mockImplementation(() => ({
    push: mockPush,
  })),
}));

describe('Testing MobileNavbar Component', () => {
  it('should check links in navbar', () => {
    render(<MobileNavbar onClick={null} />);
    const navbarLinks = screen.getAllByRole('link');
    expect(navbarLinks.length).toBe(3);
  });

  it('should check onClick prop', () => {
    const mockOnClick = vi.fn();
    render(<MobileNavbar onClick={mockOnClick} />);
    const linkEl = screen.getByRole('link', { name: /Search/i });
    fireEvent.click(linkEl);
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
