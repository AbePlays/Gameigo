import { Avatar, Box, Button, Flex, Heading, Stack, Text, useColorMode, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { ButtonWithIcon } from '@components/Buttons';
import { CustomInput } from '@components/Input';
import { checkName, checkPassword } from '@containers/Auth/helper';
import Page from '@containers/Page';
import ProtectedRoute from '@containers/Protected';
import { useAuth } from '@lib/auth';
import { Descriptions } from 'seo';

export default function Profile() {
  const { user, signout, changeDisplayName, changePassword } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';
  const initialValues: ProfileForm = { name: '', password: '' };

  const submitHandler = async (values: ProfileForm, actions: FormikHelpers<ProfileForm>) => {
    const { name, password } = values;
    try {
      await changePassword(password);
      await changeDisplayName(name);
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        title: 'Changes Saved.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      actions.resetForm();
      signout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Profile" description={Descriptions.Profile}>
      <ProtectedRoute>
        <Box maxW="container.sm" mx="auto">
          <Heading as="h1">Profile</Heading>
          <Flex align="center" my="8">
            <Avatar aria-hidden="true" src={user?.photoUrl} />
            <Heading fontSize="2xl" ml="4">
              {user?.name}
            </Heading>
          </Flex>
          <Stack bg={isDarkMode ? '#1f1f1f' : 'gray.100'} px={['4', '6']} py={['4', '8']} rounded="md" spacing="6">
            <Heading fontSize="xl">Personal Information</Heading>
            <Formik initialValues={initialValues} onSubmit={submitHandler}>
              {() => (
                <Form id="my-form">
                  <Stack spacing="4" px="4">
                    <Text as="label" color="gray.500" htmlFor="name" fontWeight="bold">
                      Display Name
                    </Text>
                    <CustomInput name="name" type="text" placeholder="" validate={checkName} />
                    <Text as="label" color="gray.500" htmlFor="password" fontWeight="bold">
                      New Password
                    </Text>
                    <CustomInput name="password" type="password" placeholder="" validate={checkPassword} />
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
          <Stack isInline justify="flex-end" mt="4" spacing="4">
            <Button colorScheme="red" onClick={signout}>
              Log Out
            </Button>
            <ButtonWithIcon form="my-form" type="submit" title="Save Changes" />
          </Stack>
        </Box>
      </ProtectedRoute>
    </Page>
  );
}
