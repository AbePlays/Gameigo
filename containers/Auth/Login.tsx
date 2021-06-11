import { FunctionComponent } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Heading, Stack, Text } from '@chakra-ui/layout';

import { useAuth } from '../../lib/auth';
import { CustomInput } from '@/components/Input';
import { LoginForm } from './types';
import { checkEmail, checkPassword } from './helper';
import SocialAuthProviders from './SocialAuthProviders';

const Login: FunctionComponent = () => {
  const initialValues: LoginForm = { email: '', password: '' };

  const { loginWithEmailAndPassword } = useAuth();

  const submitHandler = async (
    values: LoginForm,
    actions: FormikHelpers<LoginForm>
  ) => {
    try {
      const { email, password } = values;
      await loginWithEmailAndPassword(email, password);
      actions.resetForm();
    } catch (e) {
      console.log(`Error while logging in ${e}`);
    }
  };

  return (
    <Box textAlign="center">
      <Heading as="h1" fontWeight="extrabold" fontSize={['5xl', '6xl']}>
        Login to Your Account
      </Heading>
      <Text fontSize="xl" maxW="xl" mx="auto" color="gray.700" mt="8">
        Choose from 30,000+ games around the world with new addition every few
        weeks
      </Text>
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row']}
        justifyContent="center"
        mt={['10', '10', '32']}
        maxW={['full', '30rem', '50rem']}
        mx="auto"
        style={{ gap: '5rem' }}
      >
        <Box flex="1">
          <Formik initialValues={initialValues} onSubmit={submitHandler}>
            {(props) => (
              <Form>
                <Stack spacing="4">
                  <CustomInput
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    validate={checkEmail}
                  />
                  <CustomInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    validate={checkPassword}
                  />
                  <Button
                    h="12"
                    bg="black"
                    color="white"
                    _hover={{
                      bg: '#444',
                    }}
                    isLoading={props.isSubmitting}
                    type="submit"
                    rightIcon={<ChevronRightIcon h="6" w="6" />}
                    justifyContent={
                      props.isSubmitting ? 'center' : 'space-between'
                    }
                  >
                    Login to Your Account
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
        <Stack spacing="4" flex="1">
          <SocialAuthProviders />
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
