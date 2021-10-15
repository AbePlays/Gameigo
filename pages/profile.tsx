import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { Form, Formik, FormikHelpers } from 'formik';
import {
  useColorMode,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  useToast,
  Text,
} from '@chakra-ui/react';

import { ButtonWithIcon } from '@/components/Buttons';
import { CustomInput } from '@/components/Input';
import { checkName, checkPassword } from '@/containers/Auth/helper';
import Page from '@/containers/Page';
import ProtectedRoute from '@/containers/Protected';
import { useAuth } from 'lib/auth';
import { Routes } from 'routes';
import { Descriptions } from 'seo';
import { ProfileForm } from 'types';

const BackArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const Profile: FunctionComponent = () => {
  const { user, signout, changeDisplayName, changePassword } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';
  const initialValues: ProfileForm = { name: '', password: '' };

  const submitHandler = async (
    values: ProfileForm,
    actions: FormikHelpers<ProfileForm>
  ) => {
    const { name, password } = values;
    try {
      await changePassword(password);
      await changeDisplayName(name);
      toast({
        title: 'Changes Saved.',
        status: 'success',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });
      actions.resetForm();
      signout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedRoute redirectUrl={Routes.AUTH_SCREEN}>
      <Page title="Profile" description={Descriptions.Profile}>
        <Box maxW="container.sm" mx="auto">
          <Flex align="center">
            <Box w="8" cursor="pointer" onClick={() => router.back()}>
              <BackArrow />
            </Box>
            <Heading as="h1" ml="4">
              Profile
            </Heading>
          </Flex>
          <Flex align="center" my="8">
            <Avatar src={user?.photoUrl} />
            <Heading fontSize="2xl" ml="4">
              {user?.name}
            </Heading>
          </Flex>
          <Stack
            bg={isDarkMode ? '#1f1f1f' : 'gray.100'}
            px={['4', '6']}
            py={['4', '8']}
            rounded="md"
            spacing="6"
          >
            <Heading fontSize="xl">Personal Informations</Heading>
            <Formik initialValues={initialValues} onSubmit={submitHandler}>
              {() => (
                <Form id="my-form">
                  <Stack spacing="4" px="4">
                    <Text fontWeight="bold" color="gray.500">
                      Display Name
                    </Text>
                    <CustomInput
                      name="name"
                      type="text"
                      placeholder=""
                      validate={checkName}
                    />
                    <Text fontWeight="bold" color="gray.500">
                      Change Password
                    </Text>
                    <CustomInput
                      name="password"
                      type="password"
                      placeholder=""
                      validate={checkPassword}
                    />
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
          <Center mt="8">
            <ButtonWithIcon
              form="my-form"
              type="submit"
              title="Save Changes"
              icon={null}
              // onClick={submitHandler}
            />
            <Button colorScheme="red" ml="4" onClick={signout}>
              Log Out
            </Button>
          </Center>
        </Box>
      </Page>
    </ProtectedRoute>
  );
};

export default Profile;
