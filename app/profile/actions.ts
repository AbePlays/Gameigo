'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { ValiError, flatten, parse, string } from 'valibot'

import { createClient } from '@libs/supabase/server'
import { NameSchema, PasswordSchema } from '@schemas/auth'
import { INITIAL_CHANGE_NAME_STATE, INITIAL_CHANGE_PASSWORD_STATE } from './constant'
import { redirect } from 'next/navigation'

function transformErrorMessages(
  errors: { readonly [x: string]: [string, ...string[]] | undefined } | undefined
): Record<string, string> {
  const transformedErrors: Record<string, string> = {}

  for (const key in errors) {
    if (errors[key]) {
      // @ts-ignore
      transformedErrors[key] = errors[key]?.[0]
    }
  }

  return transformedErrors
}

export async function changeName(
  _: typeof INITIAL_CHANGE_NAME_STATE,
  formData: FormData
): Promise<typeof INITIAL_CHANGE_NAME_STATE> {
  try {
    const fields = Object.fromEntries(formData.entries())
    const result = parse(NameSchema, fields)

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.updateUser({ data: { name: result.name } })

    if (error) {
      return {
        fields: result,
        errors: { ...INITIAL_CHANGE_NAME_STATE.errors, name: error.message },
        saved: false,
      }
    }

    revalidatePath('/profile')
    return { errors: INITIAL_CHANGE_NAME_STATE.errors, fields: result, saved: true }
  } catch (e) {
    const fields = {
      name: parse(string(), formData.get('name') || ''),
    }
    if (e instanceof ValiError) {
      const formErrors = flatten(e.issues).nested
      const errors = transformErrorMessages(formErrors)
      return {
        errors: { ...INITIAL_CHANGE_NAME_STATE.errors, ...errors },
        fields,
        saved: false,
      }
    }

    return { errors: { ...INITIAL_CHANGE_NAME_STATE.errors, form: 'Something went wrong' }, fields, saved: false }
  }
}

export async function changePassword(
  _: typeof INITIAL_CHANGE_PASSWORD_STATE,
  formData: FormData
): Promise<typeof INITIAL_CHANGE_PASSWORD_STATE> {
  try {
    const fields = Object.fromEntries(formData.entries())
    const result = parse(PasswordSchema, fields)

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.updateUser({ password: result.password })

    if (error) {
      return {
        fields: result,
        errors: { ...INITIAL_CHANGE_PASSWORD_STATE.errors, password: error.message },
        saved: false,
      }
    }

    revalidatePath('/profile')
    return { errors: INITIAL_CHANGE_PASSWORD_STATE.errors, fields: result, saved: true }
  } catch (e) {
    const fields = {
      password: parse(string(), formData.get('password') || ''),
    }
    if (e instanceof ValiError) {
      const formErrors = flatten(e.issues).nested
      const errors = transformErrorMessages(formErrors)
      return {
        errors: { ...INITIAL_CHANGE_PASSWORD_STATE.errors, ...errors },
        fields,
        saved: false,
      }
    }

    return { errors: { ...INITIAL_CHANGE_PASSWORD_STATE.errors, form: 'Something went wrong' }, fields, saved: false }
  }
}

export async function signout() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  await supabase.auth.signOut()
  redirect('/home')
}
