import { FunctionComponent, useState } from 'react';
import { useColorMode, Box, Button, Text } from '@chakra-ui/react';

import Page from '@/containers/Page';
import { Login, Signup } from '@/containers/Auth';

const Auth: FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const pageTitle = isLogin ? 'Log in' : 'Sign up';
  const footer = {
    head: isLogin ? "Don't have an account? " : 'Already have an account? ',
    tail: isLogin ? 'Sign up' : 'Log in',
  };

  const toggle = () => setIsLogin((prev) => !prev);

  return (
    <Page title={pageTitle}>
      <Box textAlign="center">
        {isLogin ? <Login /> : <Signup />}
        <Text mt={['10', '10', '16']}>
          {footer.head}
          <Button
            variant="link"
            color={isDarkMode ? 'white' : 'black'}
            onClick={toggle}
            fontWeight="bold"
          >
            {footer.tail}
          </Button>{' '}
          instead
        </Text>
      </Box>
    </Page>
  );
};

export default Auth;
