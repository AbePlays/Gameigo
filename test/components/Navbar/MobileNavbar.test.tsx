import MobileNavbar from '@components/Navbar/MobileNavbar';
import { fireEvent, render, screen } from '../../test-utils';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
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
    const mockOnClick = jest.fn();
    render(<MobileNavbar onClick={mockOnClick} />);
    const linkEl = screen.getByRole('link', { name: /Search/i });
    fireEvent.click(linkEl);
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
