import Navbar from '@components/Navbar';
import { fireEvent, render, screen } from '../../test-utils';

describe('Testing Navbar Component', () => {
  it('should check links in navbar', () => {
    render(<Navbar />);
    const linkEls = screen.getAllByRole('link');
    expect(linkEls.length).toBe(2);
  });

  it('should test dark mode button', () => {
    render(<Navbar />);
    let buttonEl = screen.getByRole('button', { name: /Dark Mode/i });
    expect(buttonEl).toBeInTheDocument();
    fireEvent.click(buttonEl);
    buttonEl = screen.getByRole('button', { name: /Light Mode/i });
    expect(buttonEl).toBeInTheDocument();
  });
});
