import Auth from '../../pages/auth';
import { render, screen, fireEvent } from '../test-utils';

describe('Testing Auth Component', () => {
  it('should check for CTA', () => {
    render(<Auth />);
    let button = screen.getByRole('button', { name: /sign up/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    button = screen.getByRole('button', { name: /log in/i });
    expect(button).toBeInTheDocument();
  });
});
