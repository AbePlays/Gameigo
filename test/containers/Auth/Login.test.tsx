import { Login } from '@containers/Auth';
import { mockEmail, mockPassword } from '../../mockData';
import {
  fireEvent,
  mockValue,
  render,
  screen,
  waitFor,
} from '../../test-utils';

describe('Testing Login Container', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should check login heading', () => {
    render(<Login />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login to your account/i);
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

  it('should show error text on invalid input', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    const buttonEl = screen.getByRole('button', {
      name: /login to your account/i,
    });
    fireEvent.click(buttonEl);
    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password should be atleast 6 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it('should check in sign in with email works', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    const buttonEl = screen.getByRole('button', {
      name: /login to your account/i,
    });
    fireEvent.click(buttonEl);
    await waitFor(() => {
      expect(mockValue.loginWithEmailAndPassword).toHaveBeenCalled();
      expect(mockValue.loginWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(mockValue.loginWithEmailAndPassword).toHaveBeenCalledWith(
        mockEmail,
        mockPassword
      );
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  it('should show error toast if login fails', async () => {
    mockValue.loginWithEmailAndPassword.mockRejectedValueOnce('Login Failed');
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    const buttonEl = screen.getByRole('button', {
      name: /login to your account/i,
    });

    fireEvent.click(buttonEl);
    await waitFor(() => {
      expect(mockValue.loginWithEmailAndPassword).toHaveBeenCalled();
      expect(mockValue.loginWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(mockValue.loginWithEmailAndPassword).toHaveBeenCalledWith(
        mockEmail,
        mockPassword
      );
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });
});
