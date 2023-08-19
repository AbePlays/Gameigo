import { Avatar, Box, Button, Flex, Icon, Link, Stack, Tooltip, useColorMode } from '@chakra-ui/react';
import { Cross1Icon, HamburgerMenuIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { AnimatePresence } from 'framer-motion';
import NextLink from 'next/link';
import { useState } from 'react';

import { useAuth } from '@lib/auth';
import MobileNavbar from './MobileNavbar';

const iconSize = 4;

export default function Navbar() {
  const { user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const isDarkMode = colorMode === 'dark';

  const toggleNav = () => setShowMobileNav((prev) => !prev);

  return (
    <Box className="adaptive-glass" position="sticky" shadow="sm" top="0" zIndex="999">
      <Flex alignItems="center" justifyContent="space-between" maxW="container.xl" minH="14" mx="auto" p="4">
        <Box
          aria-label="Menu"
          aria-expanded={showMobileNav ? 'true' : 'false'}
          as="button"
          display={['flex', 'none']}
          onClick={toggleNav}
        >
          {showMobileNav ? (
            <Icon as={Cross1Icon} w={iconSize} h={iconSize} />
          ) : (
            <Icon as={HamburgerMenuIcon} w={iconSize} h={iconSize} />
          )}
        </Box>
        <NextLink href="/home" legacyBehavior passHref>
          <Link
            fontWeight="semibold"
            letterSpacing="widest"
            textDecoration="none"
            position={['absolute', 'relative']}
            right={['50%', '0']}
            top={['5', '0']}
            transform={['translate(50%, 0)', 'none']}
          >
            GAMEIGO
          </Link>
        </NextLink>
        <Stack direction="row" spacing={['8', '8', '12']} display={['none', 'flex']}>
          <NextLink href="/search" legacyBehavior passHref>
            <Link fontWeight="medium" _hover={{ opacity: 0.5 }}>
              Search
            </Link>
          </NextLink>
          <NextLink href={user ? '/favorites' : '#'} legacyBehavior passHref>
            <Link
              cursor={user ? 'pointer' : 'not-allowed'}
              fontWeight="medium"
              opacity={user ? 1 : 0.5}
              _hover={{ opacity: 0.5 }}
            >
              <Tooltip label="Please login first" isDisabled={!!user}>
                Favorites
              </Tooltip>
            </Link>
          </NextLink>
          <NextLink href="/about" legacyBehavior passHref>
            <Link fontWeight="medium" _hover={{ opacity: 0.5 }}>
              About
            </Link>
          </NextLink>
        </Stack>
        <Stack direction="row" spacing="3">
          <Button
            aria-label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            w="4"
            h="8"
            onClick={toggleColorMode}
            variant="outline"
          >
            <Icon as={isDarkMode ? SunIcon : MoonIcon} />
          </Button>
          <NextLink href={user ? '/profile' : '/auth'} legacyBehavior passHref>
            <Link aria-label="Profile" rounded="full">
              <Avatar size="sm" src={user?.photoUrl} />
            </Link>
          </NextLink>
        </Stack>
      </Flex>
      <AnimatePresence mode="wait">{showMobileNav ? <MobileNavbar onClick={toggleNav} /> : null}</AnimatePresence>
    </Box>
  );
}
