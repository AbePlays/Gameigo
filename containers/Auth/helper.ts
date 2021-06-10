import { validateEmail, validatePassword } from '../../utils/auth';

export const checkEmail = (value: string): string => {
  let error: string;
  if (!validateEmail(value)) {
    error = 'Invalid email';
  }
  return error;
};

export const checkPassword = (value: string): string => {
  let error: string;
  if (!validatePassword(value)) {
    error = 'Password should be atleast 6 characters long';
  }
  return error;
};
