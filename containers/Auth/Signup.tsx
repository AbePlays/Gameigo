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

import { ButtonWithIcon } from '@components/Buttons';
import { CustomInput } from '@components/Input';
import { useAuth } from '@lib/auth';
import SocialAuthProviders from './SocialAuthProviders';
import { checkEmail, checkName, checkPassword } from './helper';
import { SignupForm } from './types';

const Signup: FunctionComponent = () => {
  const { signupWithEmailAndPassword } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';
  const initialValues: SignupForm = { email: '', password: '', name: '' };

  const submitHandler = async (
    values: SignupForm,
    actions: FormikHelpers<SignupForm>
  ) => {
    try {
      const { email, name, password } = values;
      await signupWithEmailAndPassword(email, password, name);
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        title: 'Signup Successful.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      actions.resetForm();
    } catch (e) {
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
        title: 'Signup Failed.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      console.log(`Error while signing up ${e}`);
    }
  };

  return (
    <Box textAlign="center">
      <Heading as="h1" fontWeight="extrabold" fontSize={['5xl', '6xl']}>
        Create Your Account
      </Heading>
      <Text
        fontSize="xl"
        maxW="xl"
        mx="auto"
        color={isDarkMode ? 'gray.300' : 'gray.700'}
        mt="8"
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
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    validate={checkName}
                  />
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
                  <ButtonWithIcon
                    title="Create Your Account"
                    icon={<ChevronRightIcon h="6" w="6" />}
                    h="12"
                    isLoading={props.isSubmitting}
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

export default Signup;
