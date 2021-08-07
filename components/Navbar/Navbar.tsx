import { FunctionComponent, useState } from 'react';
import NextLink from 'next/link';
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
import { AnimatePresence } from 'framer-motion';

const iconSize = 5;

interface Props {
  setShowContent: (a) => void;
}

const Navbar: FunctionComponent<Props> = ({ setShowContent }) => {
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAuth();

  const isDarkMode = colorMode === 'dark';
  const bgColor = isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary';

  const toggleNav = () => {
    setShowMobileNav((prev) => !prev);
    setShowContent((prev) => !prev);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {showMobileNav ? (
        <MobileNavbar onClick={toggleNav} key="someKey" />
      ) : (
        <Box bg={bgColor} shadow="sm" position="sticky" top="0" zIndex="999">
          <Flex
            alignItems="center"
            justifyContent={user ? 'space-between' : 'center'}
            maxW="container.xl"
            mx="auto"
            p="4"
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
                    fontWeight="medium"
                    _hover={{
                      opacity: 0.5,
                    }}
                  >
                    Search
                  </Link>
                </NextLink>
                <NextLink href="/favorites" passHref>
                  <Link
                    fontWeight="medium"
                    _hover={{
                      opacity: 0.5,
                    }}
                  >
                    Favorites
                  </Link>
                </NextLink>
                <NextLink href="/about" passHref>
                  <Link
                    fontWeight="medium"
                    _hover={{
                      opacity: 0.5,
                    }}
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
    </AnimatePresence>
  );
};

export default Navbar;
