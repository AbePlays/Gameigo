import React, { FunctionComponent } from 'react';
import { Heading, Box } from '@chakra-ui/react';

interface Props {
  heading: string;
}

const GameContent: FunctionComponent<Props> = ({ heading, children }) => {
  return (
    <Box>
      <Heading as="h2" mb="2">
        {heading}
      </Heading>
      {children}
    </Box>
  );
};

export default GameContent;
