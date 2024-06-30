'use client'

import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Grid, Heading, Text, TextField } from '@radix-ui/themes'
import { useFormState, useFormStatus } from 'react-dom'

import { signinUsingProvider, signinUser } from './actions'
import { INITIAL_SIGNIN_STATE } from './constant'
import { SocialAuthProviders } from './social-auth-providers'

function Signin() {
  const [state, formAction] = useFormState(signinUser, INITIAL_SIGNIN_STATE)
  const [, providerAction] = useFormState(signinUsingProvider, null)

  return (
    <Box>
      <Heading align="center" size={{ initial: '8', sm: '9' }}>
        Signin to Your Account
      </Heading>
      <Text align="center" as="p" className="max-w-xl" mt="9" mx="auto" size="5">
        Choose from 30,000+ games around the world with new addition every few weeks
      </Text>

      <Grid columns={{ initial: '1', sm: '2' }} gap="4" mt="9" mx="auto" maxWidth="50rem">
        <form action={formAction}>
          <Grid gap="4">
            <Grid gap="2">
              <TextField.Root name="email" type="email" placeholder="Enter your email" size="3" />
              {state.errors.email && (
                <Text align="left" color="red" size="2">
                  {state.errors.email}
                </Text>
              )}
            </Grid>

            <Grid gap="2">
              <TextField.Root name="password" type="password" placeholder="Enter your password" size="3" />
              {state.errors.password && (
                <Text align="left" color="red" size="2">
                  {state.errors.password}
                </Text>
              )}
            </Grid>

            {state.errors.form && (
              <Text align="left" color="red" size="2">
                {state.errors.form}
              </Text>
            )}

            <Submit />
          </Grid>
        </form>

        <Grid asChild className="content-start" gap="4" mt={{ initial: '9', sm: '0' }}>
          <form action={providerAction}>
            <SocialAuthProviders />
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

function Submit() {
  const { pending } = useFormStatus()

  return (
    <Flex asChild justify="between">
      <Button disabled={pending} type="submit" size="3">
        {pending ? 'Signing in...' : 'Signin to Your Account'}
        <ChevronRightIcon />
      </Button>
    </Flex>
  )
}

export { Signin }
