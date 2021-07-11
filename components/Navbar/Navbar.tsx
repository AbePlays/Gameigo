import { FunctionComponent, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

import MobileNavbar from './MobileNavbar';
import { useAuth } from 'lib/auth';

const iconSize = 5;

interface Props {
  setShowContent: (a) => void;
}

const Navbar: FunctionComponent<Props> = ({ setShowContent }) => {
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth();
  const router = useRouter();

  const currentPath = router.pathname;
  const isDarkMode = colorMode === 'dark';
  const bgColor = isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary';

  const toggleNav = () => {
    setShowMobileNav((prev) => !prev);
    setShowContent((prev) => !prev);
  };

  return (
    <>
      {showMobileNav ? (
        <MobileNavbar onClick={toggleNav} />
      ) : (
        <Box bg={bgColor} shadow="sm">
          <Flex
            alignItems="center"
            justifyContent={user ? 'space-between' : 'center'}
            maxW="container.xl"
            mx="auto"
            p="4"
            position="sticky"
            top="0"
            zIndex="999"
          >
            {user && (
              <Box as="button" display={['block', 'none']}>
                <Icon
                  as={HamburgerIcon}
                  w={iconSize}
                  h={iconSize}
                  onClick={toggleNav}
                />
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
                  <Link
                    fontWeight={currentPath === '/search' ? 'bold' : 'light'}
                  >
                    Search
                  </Link>
                </NextLink>
                <NextLink href="/favorites" passHref>
                  <Link
                    fontWeight={currentPath === '/favorites' ? 'bold' : 'light'}
                  >
                    Favorites
                  </Link>
                </NextLink>
                <NextLink href="/about" passHref>
                  <Link
                    fontWeight={currentPath === '/about' ? 'bold' : 'light'}
                  >
                    About
                  </Link>
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
      )}
    </>
  );
};

export default Navbar;
