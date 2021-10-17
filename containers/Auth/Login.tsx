import { FunctionComponent } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  useToast,
  Box,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { ButtonWithIcon } from '@/components/Buttons';
import { CustomInput } from '@/components/Input';
import SocialAuthProviders from './SocialAuthProviders';
import { useAuth } from 'lib/auth';
import { checkEmail, checkPassword } from './helper';
import { LoginForm } from './types';

const Login: FunctionComponent = () => {
  const { loginWithEmailAndPassword } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';
  const initialValues: LoginForm = { email: '', password: '' };

  const submitHandler = async (
    values: LoginForm,
    actions: FormikHelpers<LoginForm>
  ) => {
    try {
      const { email, password } = values;
      await loginWithEmailAndPassword(email, password);
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        title: 'Login Successful.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      actions.resetForm();
    } catch (e) {
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
        title: 'Login Failed.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      console.log(`Error while logging in ${e}`);
    }
  };

  return (
    <Box textAlign="center">
      <Heading as="h1" fontWeight="extrabold" fontSize={['5xl', '6xl']}>
        Login to Your Account
      </Heading>
      <Text
        color={isDarkMode ? 'gray.300' : 'gray.700'}
        fontSize="xl"
        maxW="xl"
        mt="8"
        mx="auto"
      >
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
                    placeholder="Enter your email"
                    type="text"
                    validate={checkEmail}
                  />
                  <CustomInput
                    name="password"
                    placeholder="Password"
                    type="password"
                    validate={checkPassword}
                  />
                  <ButtonWithIcon
                    h="12"
                    icon={<ChevronRightIcon h="6" w="6" />}
                    isLoading={props.isSubmitting}
                    title="Login to Your Account"
                    type="submit"
                    justifyContent={
                      props.isSubmitting ? 'center' : 'space-between'
                    }
                  />
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
