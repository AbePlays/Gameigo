import React, { FunctionComponent } from 'react';
import { Heading, Box } from '@chakra-ui/react';

interface Props {
  children?: React.ReactNode;
  heading: string;
}

const GameContent: FunctionComponent<Props> = ({ children, heading }) => {
  return (
    <Box>
      <Heading as="h3" fontSize={['2xl']} mb="2">
        {heading}
      </Heading>
      {children}
    </Box>
  );
};

export default GameContent;
