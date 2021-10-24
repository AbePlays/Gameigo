import { Login } from '@containers/Auth';
import { render, screen } from '../../test-utils';

describe('Testing Login Container', () => {
  it('should check login heading', () => {
    render(<Login />);
    expect(
      screen.getByText(/login to your account/i, { selector: 'h1' })
    ).toBeInTheDocument();
  });

  it('should check form inputs', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should check for form submit button', () => {
    render(<Login />);
    const button = screen.getByRole('button', {
      name: /login to your account/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should check for auth providers', () => {
    render(<Login />);
    expect(
      screen.getByRole('button', { name: /sign in with google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in with github/i })
    ).toBeInTheDocument();
  });
});
