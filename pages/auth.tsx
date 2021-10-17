import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useColorMode, Box, Button, Text } from '@chakra-ui/react';

import Loader from '@components/Loader';
import { Login, Signup } from '@containers/Auth';
import Page from '@containers/Page';
import { useAuth } from '@lib/auth';
import { Routes } from 'routes';
import { Descriptions } from 'seo';

const Auth: FunctionComponent = () => {
  const { loading, user } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const isDarkMode = colorMode === 'dark';

  const pageTitle = isLogin ? 'Log in' : 'Sign up';
  const footer = {
    head: isLogin ? "Don't have an account? " : 'Already have an account? ',
    tail: isLogin ? 'Sign up' : 'Log in',
  };

  const toggle = () => setIsLogin((prev) => !prev);

  useEffect(() => {
    if (!loading && user) {
      router.replace(Routes.HOME_SCREEN);
    }
  }, [loading, user]);

  return (
    <Page title={pageTitle} description={Descriptions.Auth}>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </Page>
  );
};

export default Auth;
