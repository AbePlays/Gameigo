import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/button';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Heading, Stack, Text } from '@chakra-ui/layout';

import { Routes } from '../routes';

const width = 610;
const height = 610;

const Home: FunctionComponent = () => {
  const router = useRouter();

  const redirectToAuthScreen = () => {
    router.push(Routes.AUTH_SCREEN);
  };

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={['column-reverse', 'column-reverse', 'row']}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box flex="1" mt={['8', '8', '0']}>
          <Stack
            spacing="10"
            w={['100%', '100%', '100%', '30rem']}
            textAlign={['center', 'center', 'left']}
          >
            <Heading
              as="h1"
              fontWeight={['extrabold', 'extrabold', 'black']}
              fontSize={['4xl', '6xl']}
            >
              The database platform for{' '}
              <Text
                color="white"
                as="span"
                textShadow="
                  #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,
                  #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px"
              >
                gamers
              </Text>
            </Heading>
            <Text fontSize="lg" color="gray.500" lineHeight="7">
              Gameigo provides users a video game discovery platform where they
              can explore video games from around the world.
            </Text>
            <Box>
              <Button
                fontWeight="bold"
                bg="black"
                color="white"
                _hover={{ bg: '#444' }}
                rightIcon={<ChevronRightIcon w="6" h="6" />}
                onClick={redirectToAuthScreen}
              >
                Get started
              </Button>
            </Box>
          </Stack>
        </Box>
        <Box flex="1">
          <Image
            src="/images/hero.svg"
            height={height}
            width={width}
            alt="man playing on his laptop"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
