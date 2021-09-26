import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useColorMode } from '@chakra-ui/color-mode';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/layout';

import { ButtonWithIcon } from '@/components/Buttons';
import Loader from '@/components/Loader';
import ProductInfo from '@/components/ProductInfo';
import Page from '@/containers/Page';
import homeDark from '../public/images/home.png';
import easy from '../public/images/easy.png';
import free from '../public/images/free.png';
import vision from '../public/images/vision.png';
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
      <>
        <Page title="Welcome">
          <Box
            display="flex"
            flexDirection={['column-reverse', 'column-reverse', 'row']}
            alignItems="center"
            justifyContent="space-between"
            minHeight="calc(100vh - 108px)"
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
          <Box mt="24" textAlign="center">
            <Box>
              <Heading as="h2" fontSize="3xl">
                Why Choose Gameigo?
              </Heading>
              <Box
                display="flex"
                maxW="920px"
                mt="16"
                mx="auto"
                overflow="hidden"
                rounded="md"
                shadow="lg"
              >
                <Image
                  alt="Home Page Screenshot"
                  placeholder="blur"
                  src={homeDark}
                />
              </Box>

              <Box py="8">
                <ProductInfo
                  content="Gameigo is a free and open source application backed by a huge
                  database of video games provided by ROG. It supports features
                  such as searching for games, creating collections, and sharing
                  your collections with friends."
                  src={free}
                  title="Free to use and open source"
                />
                <ProductInfo
                  content="Gameigo provides a simple user interface and a simple user
                  experience. The UI is designed to be intuitive and easy to
                  use. The UX is designed to be simple and easy to understand.
                  Gameigo makes it easy to discover and share video games."
                  src={easy}
                  title="Simple UI &amp; UX"
                />
                <ProductInfo
                  content="Stop jumping from game to game, and stop having to search for
                  games. Gameigo provides everything you need in one place.
                  Manage your collections, discover new games, and share your
                  collections with friends."
                  src={vision}
                  title="Everything in one place"
                />
              </Box>
            </Box>
          </Box>
        </Page>
        <Box
          bg={isDarkMode ? 'dark-bg-secondary' : 'grey'}
          py="12"
          textAlign="center"
        >
          <Heading as="h3">Ready To Build Your Collection?</Heading>
          <Box mt="8">
            <ButtonWithIcon
              icon={<ChevronRightIcon w="6" h="6" />}
              onClick={redirectToAuthScreen}
              title="Get started"
            />
          </Box>
        </Box>
      </>
    );
  }

  return <Loader />;
};

export default Home;
