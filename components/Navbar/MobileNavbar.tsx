import { FunctionComponent } from 'react';

import CustomLink from '@components/CustomLink';
import { useAuth } from '@lib/auth';
import { MoveDownAnimation, NavbarItemAnimation, NavbarListAnimation } from '@utils/animations';
import { MotionFlex, MotionListItem, MotionUnorderedList } from '@utils/MotionElements';

interface Props {
  onClick: () => void;
}

const MobileNavbar: FunctionComponent<Props> = ({ onClick }) => {
  const { user } = useAuth();

  return (
    <MotionFlex
      variants={MoveDownAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      alignItems="center"
      justifyContent="center"
      px="2"
    >
      <MotionUnorderedList
        display="flex"
        justifyContent="space-evenly"
        mx="0"
        styleType="none"
        textAlign="center"
        variants={NavbarListAnimation}
        w="full"
      >
        <MotionListItem variants={NavbarItemAnimation}>
          <CustomLink isExt={false} link="/search" onClick={onClick} title="Search"></CustomLink>
        </MotionListItem>
        <MotionListItem variants={NavbarItemAnimation}>
          <CustomLink
            cursor={user ? 'pointer' : 'not-allowed'}
            isExt={false}
            link={user ? '/favorites' : '#'}
            onClick={user ? onClick : null}
            opacity={user ? 1 : 0.5}
            title="Favorites"
          ></CustomLink>
        </MotionListItem>
        <MotionListItem variants={NavbarItemAnimation}>
          <CustomLink isExt={false} link="/about" onClick={onClick} title="About"></CustomLink>
        </MotionListItem>
      </MotionUnorderedList>
    </MotionFlex>
  );
};

export default MobileNavbar;
