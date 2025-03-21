'use client'

import { Button, Flex, IconButton, Spinner, Strong, Text, TextField } from '@radix-ui/themes'
import { useActionState, useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'react-hot-toast'

import { changePassword } from './actions'
import { INITIAL_CHANGE_PASSWORD_STATE } from './constant'

function ChangePassword() {
  const [state, formAction] = useActionState(changePassword, INITIAL_CHANGE_PASSWORD_STATE)

  useEffect(() => {
    if (state.saved) {
      toast.success('Password updated.')
    }
  }, [state])

  return (
    <form className="mt-4" action={formAction}>
      <Strong>
        <label htmlFor="password">New Password</label>
      </Strong>
      <Flex gap="4" mt="2">
        <TextField.Root className="w-full" id="password" name="password" size="3" type="text" />
        <Submit />
      </Flex>
      {state.errors.password && (
        <Text color="red" size="2">
          {state.errors.password}
        </Text>
      )}
    </form>
  )
}

function Submit() {
  const { pending } = useFormStatus()

  if (pending) {
    return (
      <IconButton size="3">
        <Spinner />
      </IconButton>
    )
  }
  return (
    <Button size="3" type="submit">
      Save
    </Button>
  )
}

export { ChangePassword }
