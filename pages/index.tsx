import { FunctionComponent, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  Box,
  Flex,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

import { ButtonWithIcon } from '@components/Buttons';
import Loader from '@components/Loader';
import ProductInfo from '@components/ProductInfo';
import Page from '@containers/Page';
import { useAuth } from '@lib/auth';
import easy from 'public/images/easy.png';
import free from 'public/images/free.png';
import hero from 'public/images/hero.png';
import homeDark from 'public/images/home.png';
import vision from 'public/images/vision.png';
import { Routes } from 'routes';
import { Descriptions } from 'seo';

const Home: FunctionComponent = () => {
  const { loading, user } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const isDarkMode = colorMode === 'dark';

  const redirectToAuthScreen = () => router.push(Routes.AUTH_SCREEN);

  useEffect(() => {
    if (!loading && user) {
      router.replace(Routes.HOME_SCREEN);
    }
  }, [loading, router, user]);

  return (
    <Page
      title="Welcome"
      description={Descriptions.Welcome}
      maxWidth="1536px"
      pt="8"
      px="0"
      py="0"
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box maxWidth="1120px" mx="auto" px="4">
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
                <Image alt="" placeholder="blur" src={hero} />
              </Flex>
            </Box>
            <Box mt="24" textAlign="center">
              <Box>
                <Heading as="h2" fontSize="3xl">
                  Why Choose Gameigo?
                </Heading>
                <Box
                  aria-hidden="true"
                  maxW="920px"
                  mt="16"
                  mx="auto"
                  position="relative"
                >
                  <Box
                    bgGradient="linear(to-r, gradient-red, gradient-blue)"
                    filter="blur(8px)"
                    position="absolute"
                    inset="-3px"
                  ></Box>
                  <Box
                    display="flex"
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
                </Box>
                <UnorderedList py="8" mx="0" listStyleType="none">
                  <ListItem>
                    <ProductInfo
                      content="Gameigo is a free and open source application backed by a huge
                  database of video games provided by ROG. It supports features
                  such as searching for games, creating collections, and sharing
                  your collections with friends."
                      src={free}
                      title="Free to use and open source"
                    />
                  </ListItem>
                  <ListItem>
                    <ProductInfo
                      content="Gameigo provides a simple user interface and a simple user
                    experience. The UI is designed to be intuitive and easy to
                    use. The UX is designed to be simple and easy to understand.
                    Gameigo makes it easy to discover and share video games."
                      src={easy}
                      title="Simple UI &amp; UX"
                    />
                  </ListItem>
                  <ListItem>
                    <ProductInfo
                      content="Stop jumping from game to game, and stop having to search for
                    games. Gameigo provides everything you need in one place.
                    Manage your collections, discover new games, and share your
                    collections with friends."
                      src={vision}
                      title="Everything in one place"
                    />
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </Box>
          <Box
            bg={isDarkMode ? 'dark-bg-secondary' : 'grey'}
            py="6"
            textAlign="center"
          >
            <Heading as="h3">Ready to Explore?</Heading>
            <Box mt="4">
              <ButtonWithIcon
                icon={<ChevronRightIcon w="6" h="6" />}
                onClick={redirectToAuthScreen}
                title="Get started"
              />
            </Box>
          </Box>
        </>
      )}
    </Page>
  );
};

export default Home;
