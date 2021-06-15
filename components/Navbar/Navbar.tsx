import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Heading,
  Flex,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  Link,
  Text,
} from '@chakra-ui/react';
import {
  MoonIcon,
  SearchIcon,
  StarIcon,
  SettingsIcon,
  InfoIcon,
  WarningTwoIcon,
} from '@chakra-ui/icons';

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
      <NextLink href="/" passHref>
        <Link letterSpacing="widest">GAMEIGO</Link>
      </NextLink>
      <Flex alignItems="center">
        <Button mr="2">
          <SearchIcon />
        </Button>
        <Button mr="3">
          <MoonIcon />
        </Button>
        <Menu placement="bottom-end">
          <MenuButton>
            <Avatar size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Avatar size="sm" />
              <Box ml="4">
                <Heading as="h3" fontSize="md">
                  User Name
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  User Email
                </Text>
              </Box>
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<StarIcon />} alignItems="center">
              Favorites
            </MenuItem>
            <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
            <MenuItem icon={<InfoIcon />}>About</MenuItem>
            <MenuDivider />
            <MenuItem icon={<WarningTwoIcon />} color="red">
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
