export const SOCIALAUTHPROVIDERS = [
  { id: 1, title: 'Sign in with Google', providerId: 'google' },
  { id: 2, title: 'Sign in with Github', providerId: 'github' },
] as const

export const INITIAL_SIGNUP_STATE = {
  fields: { email: '', name: '', password: '' },
  errors: { email: '', name: '', password: '', form: '' },
}

export const INITIAL_SIGNIN_STATE = {
  fields: { email: '', password: '' },
  errors: { email: '', password: '', form: '' },
}
