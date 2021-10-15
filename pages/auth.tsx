import { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { useColorMode, Box, Button, Text } from '@chakra-ui/react';

import Loader from '@/components/Loader';
import { Login, Signup } from '@/containers/Auth';
import Page from '@/containers/Page';
import { useAuth } from 'lib/auth';
import { Routes } from 'routes';
import { Descriptions } from 'seo';

const Auth: FunctionComponent = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { colorMode } = useColorMode();
  const { loading, user } = useAuth();
  const router = useRouter();

  const isDarkMode = colorMode === 'dark';

  const pageTitle = isLogin ? 'Log in' : 'Sign up';
  const footer = {
    head: isLogin ? "Don't have an account? " : 'Already have an account? ',
    tail: isLogin ? 'Sign up' : 'Log in',
  };

  const toggle = () => setIsLogin((prev) => !prev);

  if (user) router.replace(Routes.HOME_SCREEN);

  if (loading) return <Loader />;

  if (!loading && !user) {
    return (
      <Page title={pageTitle} description={Descriptions.Auth}>
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
  }

  return <Loader />;
};

export default Auth;
