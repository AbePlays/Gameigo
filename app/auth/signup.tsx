'use client';

import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Box, Button, Grid, Heading, Text, TextFieldInput } from '@radix-ui/themes';

import { useFormState, useFormStatus } from 'react-dom';
import { signinUsingProvider, signupUser } from './actions';
import { INITIAL_SIGNUP_STATE } from './constant';
import { SocialAuthProviders } from './social-auth-providers';

function Signup() {
  const [state, formAction] = useFormState(signupUser, INITIAL_SIGNUP_STATE);
  const [, providerAction] = useFormState(signinUsingProvider, null);

  return (
    <Box className="text-center">
      <Heading className="font-extrabold" size="8">
        Create Your Account
      </Heading>
      <Text as="p" className="text-xl font-medium max-w-xl" mt="8" mx="auto">
        Choose from 30,000+ games around the world with new addition every few weeks
      </Text>

      <Grid columns="2" gap="4">
        <form action={formAction}>
          <Grid gap="4">
            <Grid gap="2">
              <TextFieldInput name="name" placeholder="Enter your full name" type="text" />
              {state.errors.name && (
                <Text align="left" color="red" size="2">
                  {state.errors.name}
                </Text>
              )}
            </Grid>

            <Grid gap="2">
              <TextFieldInput name="email" placeholder="Enter your email" type="email" />
              {state.errors.email && (
                <Text align="left" color="red" size="2">
                  {state.errors.email}
                </Text>
              )}
            </Grid>

            <Grid gap="2">
              <TextFieldInput name="password" placeholder="Enter your password" type="password" />
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

        <Grid asChild className="content-start" gap="4">
          <form action={providerAction}>
            <SocialAuthProviders />
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? 'Creating your account...' : 'Create Your Account'} <ChevronRightIcon />
    </Button>
  );
}

export { Signup };
