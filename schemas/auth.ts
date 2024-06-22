import { email, minLength, object, picklist, pipe, string } from 'valibot';

export const SignupSchema = object({
  email: pipe(string(), email('The email is not valid.')),
  name: pipe(string(), minLength(2, 'The name is too short.')),
  password: pipe(string(), minLength(6, 'The password is too short.')),
});

export const SigninSchema = object({
  email: pipe(string(), email('The email is not valid.')),
  password: pipe(string(), minLength(6, 'The password is too short.')),
});

export const ProviderSchema = object({
  provider: picklist(['google', 'github']),
});
