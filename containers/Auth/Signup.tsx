import { FunctionComponent } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Box } from '@chakra-ui/layout';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';

import { CustomInput } from '@/components/Input';
import { useAuth } from '../../lib/auth';
import { checkEmail, checkName, checkPassword } from './helper';
import { SignupForm } from './types';
import SocialAuthProviders from './SocialAuthProviders';

const Signup: FunctionComponent = () => {
  const initialValues: SignupForm = { email: '', password: '', name: '' };
  const { signupWithEmailAndPassword } = useAuth();

  const submitHandler = async (
    values: SignupForm,
    actions: FormikHelpers<SignupForm>
  ) => {
    try {
      const { email, name, password } = values;
      await signupWithEmailAndPassword(email, password, name);
      actions.resetForm();
    } catch (e) {
      console.log(`Error while signing up ${e}`);
    }
  };

  return (
    <Box textAlign="center">
      <Heading as="h1" fontWeight="extrabold" fontSize={['5xl', '6xl']}>
        Create Your Account
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
                    Create Your Account
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

export default Signup;
