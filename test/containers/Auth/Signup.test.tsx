import { Signup } from '@containers/Auth';
import { render, screen } from '../../test-utils';

describe('Testing Signup Container', () => {
  it('should check signup heading', () => {
    render(<Signup />);
    expect(
      screen.getByText(/create your account/i, { selector: 'h1' })
    ).toBeInTheDocument();
  });

  it('should check form inputs', () => {
    render(<Signup />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should check for form submit button', () => {
    render(<Signup />);
    const button = screen.getByRole('button', {
      name: /create your account/i,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should check for auth providers', () => {
    render(<Signup />);
    expect(
      screen.getByRole('button', { name: /sign in with google/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in with github/i })
    ).toBeInTheDocument();
  });
});
