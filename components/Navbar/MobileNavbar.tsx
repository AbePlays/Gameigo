import { FunctionComponent } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

import CustomLink from '../CustomLink';

interface Props {
  onClick: () => void;
}

const MobileNavbar: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <Box h="100vh" w="100vw" px="4" py="14">
      <Flex justifyContent="flex-end">
        <Button
          alignItems="baseline"
          display="flex"
          fontWeight="medium"
          letterSpacing="widest"
          onClick={onClick}
          textTransform="uppercase"
          variant="unstyled"
        >
          Close <Icon as={CloseIcon} w="3" h="3" ml="2" />
        </Button>
      </Flex>
      <UnorderedList
        display="flex"
        flexDirection="column"
        h="full"
        justifyContent="space-evenly"
        styleType="none"
        textAlign="center"
      >
        <ListItem>
          <CustomLink
            fontSize="6xl"
            isExt={false}
            link="/search"
            onClick={onClick}
            title="Search"
          ></CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink
            fontSize="6xl"
            isExt={false}
            link="/favorites"
            onClick={onClick}
            title="Favorites"
          ></CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink
            fontSize="6xl"
            isExt={false}
            link="/about"
            onClick={onClick}
            title="About"
          ></CustomLink>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default MobileNavbar;
