import { Box } from '@chakra-ui/layout';
import { Heading, Text } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';

const Signup: FunctionComponent = () => {
  return (
    <Box textAlign="center">
      <Heading as="h1" fontWeight="extrabold" fontSize="6xl">
        Create Your Account
      </Heading>
      <Text fontSize="2xl" maxW="xl" mx="auto" color="gray.500" mt="6">
        Choose from 30,000+ games around the world with new addition every few
        weeks
      </Text>
    </Box>
  );
};

export default Signup;
