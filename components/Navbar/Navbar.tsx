import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Flex, Box, Avatar, Link, Stack, Icon, Button } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useAuth } from 'lib/auth';

const iconSize = 5;

const Navbar: FunctionComponent = () => {
  const { user, signout } = useAuth();

  return (
    <Flex
      justifyContent={user ? 'space-between' : 'center'}
      alignItems="center"
      p="4"
      shadow="sm"
      bg="white"
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
        <Stack isInline spacing={['8', '8', '12']} display={['none', 'block']}>
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
      {user && <Button onClick={signout}>Logout</Button>}
      {user && (
        <NextLink href="/profile" passHref>
          <Link>
            <Avatar size="sm" src={user.photoUrl} />
          </Link>
        </NextLink>
      )}
    </Flex>
  );
};

export default Navbar;
