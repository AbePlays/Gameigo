import { email, minLength, object, string } from 'valibot';

export const SignupSchema = object({
  email: string([email()]),
  name: string([minLength(2, 'The name is too short.')]),
  password: string([minLength(6, 'The password is too short.')]),
});

export const SigninSchema = object({
  email: string([email()]),
  password: string([minLength(6, 'The password is too short.')]),
});
