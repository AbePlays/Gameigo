import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Box, Button, Grid, Heading, Text, TextFieldInput } from '@radix-ui/themes';

import { SocialAuthProviders } from './social-auth-providers';

function Login() {
  return (
    <Box className="text-center">
      <Heading className="font-extrabold" size="8">
        Login to Your Account
      </Heading>
      <Text as="p" className="text-xl font-medium max-w-xl" mt="8" mx="auto">
        Choose from 30,000+ games around the world with new addition every few weeks
      </Text>

      <Grid columns="2" gap="4">
        <form method="post">
          <Grid gap="4">
            <TextFieldInput name="email" type="email" placeholder="Enter your email" />
            <TextFieldInput name="password" type="password" placeholder="Enter your password" />
            <Button type="submit">
              Login to Your Account <ChevronRightIcon />
            </Button>
          </Grid>
        </form>
        <Grid className="content-start" gap="4">
          <SocialAuthProviders />
        </Grid>
      </Grid>
    </Box>
  );
}

export { Login };
