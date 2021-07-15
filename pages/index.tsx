import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import { ButtonWithIcon } from '@/components/Buttons';
import Loader from '@/components/Loader';
import Page from '@/containers/Page';
import { Routes } from '../routes';
import { useAuth } from 'lib/auth';

const width = 500;
const height = 500;

const Home: FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const { loading, user } = useAuth();
  const router = useRouter();
  const isDarkMode = colorMode === 'dark';

  const redirectToAuthScreen = () => router.push(Routes.AUTH_SCREEN);

  if (user) router.replace(Routes.HOME_SCREEN);

  if (loading) return <Loader />;

  if (!loading && !user) {
    return (
      <Page title="Welcome">
        <Box
          display="flex"
          flexDirection={['column-reverse', 'column-reverse', 'row']}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex="1" mt={['8', '8', '0']}>
            <Stack
              spacing="8"
              w={['100%', '100%', '100%', '30rem']}
              textAlign={['center', 'center', 'left']}
            >
              <Heading
                as="h1"
                fontWeight={['extrabold', 'black']}
                fontSize={['5xl', '6xl']}
              >
                The database platform for{' '}
                <Text
                  color="white"
                  as="span"
                  textShadow="
                  #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,
                  #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px"
                >
                  gamers
                </Text>
              </Heading>
              <Text
                fontSize="lg"
                color={isDarkMode ? 'light-text' : 'dark-text'}
                opacity="0.7"
                lineHeight="7"
              >
                Gameigo provides users a video game discovery platform where
                they can explore and create an exclusive collection of video
                games from around the world.
              </Text>
              <Box>
                <ButtonWithIcon
                  title="Get started"
                  icon={<ChevronRightIcon w="6" h="6" />}
                  onClick={redirectToAuthScreen}
                />
              </Box>
            </Stack>
          </Box>
          <Flex flex="1" justifyContent="flex-end">
            <Image
              src="/images/hero.svg"
              height={height}
              width={width}
              alt="man playing on his laptop"
            />
          </Flex>
        </Box>
      </Page>
    );
  }

  return <Loader />;
};

export default Home;
