import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Flex, Box, Avatar, Link, Stack, Icon } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const iconSize = 5;

const Navbar: FunctionComponent = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p="4"
      shadow="sm"
      bg="white"
      position="sticky"
      top="0"
      zIndex="999"
    >
      <Box as="button" display={['block', 'none']}>
        <Icon as={HamburgerIcon} w={iconSize} h={iconSize} />
      </Box>
      <NextLink href="/" passHref>
        <Link letterSpacing="widest" textDecoration="none">
          GAMEIGO
        </Link>
      </NextLink>
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
      <NextLink href="/profile" passHref>
        <Link>
          <Avatar size="sm" />
        </Link>
      </NextLink>
    </Flex>
  );
};

export default Navbar;
