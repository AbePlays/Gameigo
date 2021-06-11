import { FunctionComponent, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { Box, Text } from '@chakra-ui/layout';

import { Login, Signup } from '@/containers/Auth';

const Auth: FunctionComponent = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const footer = {
    head: isLogin ? "Don't have an account? " : 'Already have an account? ',
    tail: isLogin ? 'Sign up' : 'Log in',
  };

  const toggle = () => setIsLogin((prev) => !prev);

  return (
    <Box textAlign="center">
      {isLogin ? <Login /> : <Signup />}
      <Text mt={['10', '10', '16']}>
        {footer.head}
        <Button variant="link" color="black" onClick={toggle}>
          {footer.tail}
        </Button>{' '}
        instead
      </Text>
    </Box>
  );
};

export default Auth;
