import { FunctionComponent } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { Button, Icon } from '@chakra-ui/react';

import CustomLink from '../CustomLink';
import {
  MotionBox,
  MotionFlex,
  MotionListItem,
  MotionUnorderedList,
} from 'utils/MotionElements';
import {
  CloseButtonAnimation,
  MoveDownAnimation,
  NavbarItemAnimation,
  NavbarListAnimation,
} from 'utils/animations';

interface Props {
  onClick: () => void;
}

const MobileNavbar: FunctionComponent<Props> = ({ onClick }) => {
  return (
    <MotionBox
      animate="show"
      bg="dark-bg-secondary"
      color="light-text"
      exit="exit"
      h="100vh"
      initial="hidden"
      px="4"
      py="14"
      variants={MoveDownAnimation}
      w="100vw"
    >
      <MotionFlex justifyContent="flex-end" variants={CloseButtonAnimation}>
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
      </MotionFlex>
      <MotionUnorderedList
        display="flex"
        flexDirection="column"
        h="full"
        justifyContent="space-evenly"
        styleType="none"
        textAlign="center"
        variants={NavbarListAnimation}
      >
        <MotionListItem variants={NavbarItemAnimation}>
          <CustomLink
            fontSize="6xl"
            isExt={false}
            link="/search"
            onClick={onClick}
            title="Search"
          ></CustomLink>
        </MotionListItem>
        <MotionListItem variants={NavbarItemAnimation}>
          <CustomLink
            fontSize="6xl"
            isExt={false}
            link="/favorites"
            onClick={onClick}
            title="Favorites"
          ></CustomLink>
        </MotionListItem>
        <MotionListItem variants={NavbarItemAnimation}>
          <CustomLink
            fontSize="6xl"
            isExt={false}
            link="/about"
            onClick={onClick}
            title="About"
          ></CustomLink>
        </MotionListItem>
      </MotionUnorderedList>
    </MotionBox>
  );
};

export default MobileNavbar;
