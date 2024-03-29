import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { useColorMode, Box, Button, Heading, Text } from '@chakra-ui/react';

import error from 'public/images/error.png';
import Page from '@containers/Page';
import BlurImage from '@components/BlurImage';

const Error: FunctionComponent = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  const isDarkMode = colorMode === 'dark';
  const goHome = () => router.replace('/home');

  return (
    <Page title="Page not found" py="0">
      <Box textAlign="center" mt="6">
        <BlurImage
          alt="A pilot watching the sky while sitting in front of his crashed plane"
          height="300"
          width="500"
          src={error}
          style={{ marginInline: 'auto' }}
        />
        <Heading mt="6">Oh Snap!</Heading>
        <Text
          color={isDarkMode ? 'light-text' : 'dark-text'}
          fontSize="lg"
          fontWeight="medium"
          maxW="lg"
          mt="4"
          mx="auto"
          opacity="0.7"
        >
          The page you&apos;re looking for was moved, removed, renamed or might have never existed.
        </Text>
        <Button
          borderColor={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
          color={isDarkMode ? 'light-text' : 'dark-text'}
          letterSpacing="widest"
          mt="8"
          onClick={goHome}
          px="6"
          py="5"
          rounded="md"
          textTransform="uppercase"
          variant="outline"
          _hover={{ transform: 'scale(0.99)' }}
        >
          Return to Home
        </Button>
      </Box>
    </Page>
  );
};

export default Error;
