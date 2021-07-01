import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import {
  useColorMode,
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { ButtonWithIcon } from '@/components/Buttons';
import Input from '@/components/Input';
import Page from '@/containers/Page';
import ProtectedRoute from '@/containers/Protected';
import { useAuth } from 'lib/auth';
import { Routes } from 'routes';

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
  const { user, signout } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();

  const isDarkMode = colorMode === 'dark';

  return (
    <ProtectedRoute redirectUrl={Routes.AUTH_SCREEN}>
      <Page title="Profile">
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
            <Box>
              <Text fontWeight="bold" color="gray.500">
                Display Name
              </Text>
              <Input type="text" mt="2" />
            </Box>
            <Box>
              <Text fontWeight="bold" color="gray.500">
                Change Password
              </Text>
              <Input type="password" mt="2" />
            </Box>
          </Stack>
          <Center mt="8">
            <ButtonWithIcon title="Save Changes" icon={null} />
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
