import { FunctionComponent } from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Props {
  heading: string;
}

const AboutCard: FunctionComponent<Props> = ({ children, heading }) => {
  return (
    <Box>
      <Text textTransform="uppercase" letterSpacing="widest" fontWeight="bold">
        {heading}
      </Text>
      <Box
        w="7"
        h="2"
        my="4"
        mx="auto"
        bg="black"
        transform="rotate(-15deg) skewX(-15deg)"
      />
      {children}
    </Box>
  );
};

export default AboutCard;
