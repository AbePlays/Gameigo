import { FunctionComponent } from 'react';
import { useColorMode, Box, Heading } from '@chakra-ui/react';

import { FadeUpAnimation } from '@utils/animations';
import { MotionBox } from '@utils/MotionElements';

interface Props {
  children?: React.ReactNode;
  heading: string;
}

const AboutCard: FunctionComponent<Props> = ({ children, heading }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <MotionBox variants={FadeUpAnimation.child}>
      <Heading fontSize="xl" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
        {heading}
      </Heading>
      <Box
        aria-hidden="true"
        bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
        h="2"
        mx="auto"
        my="4"
        transform="rotate(-15deg) skewX(-15deg)"
        w="7"
      />
      {children}
    </MotionBox>
  );
};

export default AboutCard;
