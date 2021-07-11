import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Box, Button, Heading, Text, useColorMode } from '@chakra-ui/react';

import Page from '@/containers/Page';
import { useRouter } from 'next/router';

const Error: FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const isDarkMode = colorMode === 'dark';
  const goHome = () => router.replace('/home');

  return (
    <Page title="Page not found">
      <Box textAlign="center" mt="-8">
        <Image width="400" height="400" src="/images/error.svg" />
        <Heading>Oh Snap!</Heading>
        <Text
          color="gray.400"
          fontSize="lg"
          fontWeight="medium"
          maxW="xl"
          mt="4"
          mx="auto"
        >
          The page you're looking for was moved, removed, renamed or might have
          never existed.
        </Text>
        <Button
          bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
          color={isDarkMode ? 'dark-text' : 'light-text'}
          mt="8"
          onClick={goHome}
          px="6"
          py="6"
          rounded="full"
          variant="outline"
          _hover={{
            transform: 'scale(0.99)',
          }}
        >
          Return to Home
        </Button>
      </Box>
    </Page>
  );
};

export default Error;
