import { FunctionComponent, useState } from 'react';
import NextLink from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Stack,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';

import { useAuth } from '@lib/auth';
import MobileNavbar from './MobileNavbar';

const iconSize = 5;

interface Props {
  setShowContent: (a) => void;
}

const Navbar: FunctionComponent<Props> = ({ setShowContent }) => {
  const { user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  const isDarkMode = colorMode === 'dark';

  const toggleNav = () => {
    setShowMobileNav((prev) => !prev);
    setShowContent((prev) => !prev);
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {showMobileNav ? (
        <MobileNavbar onClick={toggleNav} key="someKey" />
      ) : (
        <Box
          className="adaptive-glass"
          position="sticky"
          shadow="sm"
          top="0"
          zIndex="999"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            maxW="container.xl"
            minH="14"
            mx="auto"
            p="4"
          >
            <Box as="button" display={['block', 'none']}>
              <Icon
                as={HamburgerIcon}
                w={iconSize}
                h={iconSize}
                onClick={toggleNav}
              />
            </Box>
            <NextLink href={user ? '/home' : '/'} passHref>
              <Link
                letterSpacing="widest"
                textDecoration="none"
                position={['absolute', 'relative']}
                right={['50%', '0']}
                top={['50%', '0']}
                transform={['translate(50%, -50%)', 'none']}
              >
                GAMEIGO
              </Link>
            </NextLink>
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
              <NextLink href={user ? '/favorites' : '#'} passHref>
                <Link
                  cursor={user ? 'pointer' : 'not-allowed'}
                  fontWeight="medium"
                  opacity={user ? 1 : 0.5}
                  _hover={{
                    opacity: 0.5,
                  }}
                >
                  <Tooltip label="Please login first" isDisabled={!!user}>
                    Favorites
                  </Tooltip>
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
            <Stack isInline spacing="3">
              <Button w="4" h="8" onClick={toggleColorMode} variant="outline">
                <Icon as={isDarkMode ? SunIcon : MoonIcon} />
              </Button>
              <NextLink href={user ? '/profile' : '/auth'} passHref>
                <Link>
                  <Avatar size="sm" src={user?.photoUrl} />
                </Link>
              </NextLink>
            </Stack>
          </Flex>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
