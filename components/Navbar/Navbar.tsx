import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Box,
  Avatar,
  Button,
  Link,
  Stack,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

import { useAuth } from 'lib/auth';

const iconSize = 5;

const Navbar: FunctionComponent = () => {
  const { user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const bgColor = isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary';

  return (
    <Box bg={bgColor} shadow="sm">
      <Flex
        maxW="container.xl"
        mx="auto"
        justifyContent={user ? 'space-between' : 'center'}
        alignItems="center"
        p="4"
        position="sticky"
        top="0"
        zIndex="999"
      >
        {user && (
          <Box as="button" display={['block', 'none']}>
            <Icon as={HamburgerIcon} w={iconSize} h={iconSize} />
          </Box>
        )}
        <NextLink href="/" passHref>
          <Link letterSpacing="widest" textDecoration="none">
            GAMEIGO
          </Link>
        </NextLink>
        {user && (
          <Stack
            isInline
            spacing={['8', '8', '12']}
            display={['none', 'block']}
          >
            <NextLink href="/search" passHref>
              <Link>Search</Link>
            </NextLink>
            <NextLink href="/favorites" passHref>
              <Link>Favorites</Link>
            </NextLink>
            <NextLink href="/about" passHref>
              <Link>About</Link>
            </NextLink>
          </Stack>
        )}
        {user && (
          <Stack isInline spacing="3">
            <Button w="4" h="8" onClick={toggleColorMode} variant="outline">
              <Icon as={isDarkMode ? SunIcon : MoonIcon} />
            </Button>
            <NextLink href="/profile" passHref>
              <Link>
                <Avatar size="sm" src={user.photoUrl} />
              </Link>
            </NextLink>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
