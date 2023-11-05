import { afterEach, describe, expect, it, vi } from 'vitest';

import { Signup } from '@containers/Auth';
import { mockEmail, mockPassword, mockTitle } from 'test/mockData';
import { fireEvent, mockValue, render, screen, waitFor } from '../../test-utils';

describe('Testing Signup Container', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should check signup heading', () => {
    render(<Signup />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/create your account/i);
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
    expect(screen.getByRole('button', { name: /sign in with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in with github/i })).toBeInTheDocument();
  });

  it('should show error text on invalid input', async () => {
    render(<Signup />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    const buttonEl = screen.getByRole('button', {
      name: /create your account/i,
    });
    fireEvent.click(buttonEl);
    await waitFor(() => {
      expect(screen.getByText(/name should have atleast 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
      expect(screen.getByText(/password should be atleast 6 characters long/i)).toBeInTheDocument();
    });
  });

  it('should check in sign up with email works', async () => {
    render(<Signup />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: mockTitle } });
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    const buttonEl = screen.getByRole('button', {
      name: /create your account/i,
    });
    fireEvent.click(buttonEl);

    await waitFor(() => {
      expect(mockValue.signupWithEmailAndPassword).toHaveBeenCalled();
      expect(mockValue.signupWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(mockValue.signupWithEmailAndPassword).toHaveBeenCalledWith(mockEmail, mockPassword, mockTitle);
      expect(screen.getByText(/signup successful/i)).toBeInTheDocument();
    });
  });

  it('should show error toast if signup fails', async () => {
    mockValue.signupWithEmailAndPassword.mockRejectedValueOnce('Signup Failed');
    render(<Signup />);
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(nameInput, { target: { value: mockTitle } });
    fireEvent.change(emailInput, { target: { value: mockEmail } });
    fireEvent.change(passwordInput, { target: { value: mockPassword } });
    const buttonEl = screen.getByRole('button', {
      name: /create your account/i,
    });

    fireEvent.click(buttonEl);
    await waitFor(() => {
      expect(mockValue.signupWithEmailAndPassword).toHaveBeenCalled();
      expect(mockValue.signupWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(mockValue.signupWithEmailAndPassword).toHaveBeenCalledWith(mockEmail, mockPassword, mockTitle);
      expect(screen.getByText(/signup failed/i)).toBeInTheDocument();
    });
  });
});
