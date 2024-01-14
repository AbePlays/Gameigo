import { afterEach, describe, expect, it, vi } from 'vitest';

import { SocialAuthProviders } from 'app/auth/social-auth-providers';
import { fireEvent, mockValue, render, screen, waitFor } from '../../test-utils';

describe('Testing SocialAuthProviders Container', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should check if google login works', () => {
    render(<SocialAuthProviders />);
    const googleButton = screen.getByRole('button', {
      name: 'Sign in with Google',
    });
    expect(googleButton).toBeInTheDocument();

    fireEvent.click(googleButton);
    expect(mockValue.signinWithGoogle).toHaveBeenCalled();
    expect(mockValue.signinWithGoogle).toHaveBeenCalledTimes(1);
  });

  it('should show error toast if google sign in fails', async () => {
    mockValue.signinWithGoogle.mockRejectedValueOnce('Signin Failed');
    render(<SocialAuthProviders />);
    const googleButton = screen.getByRole('button', {
      name: 'Sign in with Google',
    });
    expect(googleButton).toBeInTheDocument();

    fireEvent.click(googleButton);
    expect(mockValue.signinWithGoogle).toHaveBeenCalled();
    expect(mockValue.signinWithGoogle).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText(/signin failed/i)).toBeInTheDocument();
    });
  });

  it('should check if github login works', () => {
    render(<SocialAuthProviders />);
    const googleButton = screen.getByRole('button', {
      name: 'Sign in with Github',
    });
    expect(googleButton).toBeInTheDocument();

    fireEvent.click(googleButton);
    expect(mockValue.signinWithGithub).toHaveBeenCalled();
    expect(mockValue.signinWithGithub).toHaveBeenCalledTimes(1);
  });

  it('should show error toast if github sign in fails', async () => {
    mockValue.signinWithGithub.mockRejectedValueOnce('Signin Failed');
    render(<SocialAuthProviders />);
    const googleButton = screen.getByRole('button', {
      name: 'Sign in with Github',
    });
    expect(googleButton).toBeInTheDocument();

    fireEvent.click(googleButton);
    expect(mockValue.signinWithGithub).toHaveBeenCalled();
    expect(mockValue.signinWithGithub).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText(/signin failed/i)).toBeInTheDocument();
    });
  });
});
