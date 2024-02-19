'use client';

import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Box, Button, Grid, Heading, Text, TextFieldInput } from '@radix-ui/themes';
import { useFormState, useFormStatus } from 'react-dom';

import { signinUser } from './actions';
import { INITIAL_SIGNIN_STATE } from './constant';
import { SocialAuthProviders } from './social-auth-providers';

function Signin() {
  const [state, formAction] = useFormState(signinUser, INITIAL_SIGNIN_STATE);

  return (
    <Box className="text-center">
      <Heading className="font-extrabold" size="8">
        Signin to Your Account
      </Heading>
      <Text as="p" className="text-xl font-medium max-w-xl" mt="8" mx="auto">
        Choose from 30,000+ games around the world with new addition every few weeks
      </Text>

      <Grid columns="2" gap="4">
        <form action={formAction}>
          <Grid gap="4">
            <Grid gap="2">
              <TextFieldInput name="email" type="email" placeholder="Enter your email" />
              {state.errors.email && (
                <Text align="left" color="red" size="2">
                  {state.errors.email}
                </Text>
              )}
            </Grid>

            <Grid gap="2">
              <TextFieldInput name="password" type="password" placeholder="Enter your password" />
              {state.errors.password && (
                <Text align="left" color="red" size="2">
                  {state.errors.password}
                </Text>
              )}
            </Grid>

            <Submit />
          </Grid>
        </form>
        <Grid className="content-start" gap="4">
          <SocialAuthProviders />
        </Grid>
      </Grid>
    </Box>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? 'Signing in...' : 'Signin to Your Account'}
      <ChevronRightIcon />
    </Button>
  );
}

export { Signin };
