'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ValiError, flatten, parse, string } from 'valibot';

import { createClient } from '@libs/supabase/server';
import { SigninSchema, SignupSchema } from '@schemas/auth';
import { INITIAL_SIGNIN_STATE, INITIAL_SIGNUP_STATE } from './constant';

function transformErrorMessages(errors: { [key: string]: string[] }): Record<string, string> {
  const transformedErrors: Record<string, string> = {};

  for (const key in errors) {
    if (errors[key]) {
      transformedErrors[key] = errors[key][0];
    }
  }

  return transformedErrors;
}

export async function signinUser(
  _: typeof INITIAL_SIGNIN_STATE,
  formData: FormData
): Promise<typeof INITIAL_SIGNIN_STATE> {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const fields = Object.fromEntries(formData.entries());
    const result = parse(SigninSchema, fields);

    const { error } = await supabase.auth.signInWithPassword({
      email: result.email,
      password: result.password,
    });

    if (error) {
      return { fields: result, errors: { ...INITIAL_SIGNIN_STATE.errors, form: error.message } };
    }
    redirect('/home');
  } catch (e) {
    const fields = {
      email: parse(string(), formData.get('email') || ''),
      password: parse(string(), formData.get('password') || ''),
    };
    if (e instanceof ValiError) {
      const formErrors = flatten(e.issues).nested;
      const errors = transformErrorMessages(formErrors);
      return {
        errors: { ...INITIAL_SIGNIN_STATE.errors, ...errors },
        fields,
      };
    }

    return { errors: { ...INITIAL_SIGNIN_STATE.errors, form: 'Something went wrong' }, fields };
  }
}

export async function signupUser(
  _: typeof INITIAL_SIGNUP_STATE,
  formData: FormData
): Promise<typeof INITIAL_SIGNUP_STATE> {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const fields = Object.fromEntries(formData.entries());
    const result = parse(SignupSchema, fields);

    const { error } = await supabase.auth.signUp({
      email: result.email,
      password: result.password,
      options: { data: { name: result.name } },
    });

    if (error) {
      return { fields: result, errors: { ...INITIAL_SIGNUP_STATE.errors, form: error.message } };
    }
    redirect('/home');
  } catch (e) {
    const fields = {
      email: parse(string(), formData.get('email') || ''),
      name: parse(string(), formData.get('name') || ''),
      password: parse(string(), formData.get('password') || ''),
    };
    if (e instanceof ValiError) {
      const formErrors = flatten(e.issues).nested;
      const errors = transformErrorMessages(formErrors);
      return {
        errors: { ...INITIAL_SIGNUP_STATE.errors, ...errors },
        fields,
      };
    }

    return { errors: { ...INITIAL_SIGNUP_STATE.errors, form: 'Something went wrong' }, fields };
  }
}
