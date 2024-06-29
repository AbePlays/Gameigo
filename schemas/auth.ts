import { email, minLength, object, picklist, pipe, string, trim } from 'valibot'

export const NameSchema = object({
  name: pipe(string(), trim(), minLength(2, 'The name is too short.')),
})

export const PasswordSchema = object({
  password: pipe(string(), trim(), minLength(6, 'The password is too short.')),
})

export const SignupSchema = object({
  ...NameSchema.entries,
  ...PasswordSchema.entries,
  email: pipe(string(), email('The email is not valid.')),
})

export const SigninSchema = object({
  ...PasswordSchema.entries,
  email: pipe(string(), email('The email is not valid.')),
})

export const ProviderSchema = object({
  provider: picklist(['google', 'github']),
})
