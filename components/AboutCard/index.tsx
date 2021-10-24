import { FunctionComponent } from 'react';
import { useColorMode, Box, Text } from '@chakra-ui/react';

import { FadeUpAnimation } from '@utils/animations';
import { MotionBox } from '@utils/MotionElements';

interface Props {
  heading: string;
}

const AboutCard: FunctionComponent<Props> = ({ children, heading }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <MotionBox variants={FadeUpAnimation.child}>
      <Text textTransform="uppercase" letterSpacing="widest" fontWeight="bold">
        {heading}
      </Text>
      <Box
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
