import { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { DeleteIcon, StarIcon } from '@chakra-ui/icons';
import {
  useToast,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import BoxWithDivider from '@/components/BoxWithDivider';
import CustomLink from '@/components/CustomLink';
import GameContent from '@/components/GameContent';
import Store from '@/components/Store';
import Page from '../Page';
import { useAuth } from 'lib/auth';
import { addGame, checkGame, deleteGame } from 'lib/db';
import { GameInfo } from 'types';
import { formatDate } from 'utils/date';
import { convertToGame } from 'utils/game';

interface Props {
  game: GameInfo;
}

const BackArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const CustomDivider = () => {
  return (
    <Box
      height="10"
      w="1"
      alignSelf="center"
      flexShrink={0}
      display={['none', 'none', 'block']}
      bg="white"
      mx="2"
      rounded="lg"
    />
  );
};

const GameDetail: FunctionComponent<Props> = ({ game }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isFav, setIsFav] = useState<boolean>(false);
  const toast = useToast();

  const onClickHandler = async () => {
    try {
      if (isFav) {
        await deleteGame(user.uid, game.id);
        toast({
          description: 'Game was removed from collection successfully.',
          duration: 4000,
          isClosable: true,
          position: 'top',
          status: 'success',
          title: 'Collection Updated.',
        });
        setIsFav(false);
      } else {
        await addGame(user.uid, convertToGame(game));
        toast({
          description: 'Game was addded to collection successfully.',
          duration: 4000,
          isClosable: true,
          position: 'top',
          status: 'success',
          title: 'Collection Updated.',
        });
        setIsFav(true);
      }
    } catch (e) {
      toast({
        description: 'There was an error while updating your collection.',
        duration: 4000,
        isClosable: true,
        position: 'top',
        status: 'error',
        title: 'Update Failed.',
      });
      console.log(e);
    }
  };

  useEffect(() => {
    checkGame(user.uid, game.id).then((res) => setIsFav(res));
  }, []);

  const clickHandler = () => router.back();

  const renderReleasedandPlaytime = () => {
    return (
      <Wrap spacing={[2, 4]}>
        <WrapItem bg="white" color="black" px="2" borderRadius="lg">
          {formatDate(game.released)}
        </WrapItem>
        {game.playtime > 0 && (
          <WrapItem textTransform="uppercase" letterSpacing="widest">
            Average Playtime: {game.playtime} Hours
          </WrapItem>
        )}
      </Wrap>
    );
  };

  const renderTriContentBox = () => {
    return (
      <Stack direction={['column', 'column', 'row']} py="4" textAlign="center">
        <Box w="full">
          <Heading as="h4">Platforms</Heading>
          <Wrap
            justify="center"
            spacing="0"
            mt="2"
            w={['full', 'full', 4 / 5]}
            mx="auto"
          >
            {game.parent_platforms.map((item, index) => (
              <WrapItem key={item.platform.id}>
                <BoxWithDivider id={index} title={item.platform.name} />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
        <CustomDivider />
        <Box w="full">
          <Heading as="h4">Metacritic Score</Heading>
          <Text mt="2">{game.metacritic}</Text>
        </Box>
        <CustomDivider />
        <Box w="full">
          <Heading as="h4">Genres</Heading>
          <Wrap
            justify="center"
            spacing="0"
            mt="2"
            w={['full', 'full', 4 / 5]}
            mx="auto"
          >
            {game.genres.map((item, index) => {
              return (
                <WrapItem key={item.id}>
                  <BoxWithDivider id={index} title={item.name} />
                </WrapItem>
              );
            })}
          </Wrap>
        </Box>
      </Stack>
    );
  };

  return (
    <Box bg="black" color="white" position="relative">
      <Box pos="absolute" inset="0">
        <Box
          w="100%"
          h="calc(100vh - 64px)"
          position="relative"
          filter="brightness(30%)"
        >
          <Image
            src={game.background_image}
            layout="fill"
            objectFit="contain"
            objectPosition="top"
            alt="game background"
          />
        </Box>
      </Box>
      <Box position="relative" zIndex="10">
        <Page title={game.name}>
          <Box w="8" cursor="pointer" onClick={clickHandler}>
            <BackArrow />
          </Box>
          <Stack spacing="4" mt="4">
            <Heading as="h1" fontSize={['4xl', '5xl']}>
              {game.name}
            </Heading>
            {renderReleasedandPlaytime()}
            <Button
              fontSize="sm"
              leftIcon={isFav ? <DeleteIcon /> : <StarIcon />}
              letterSpacing="widest"
              onClick={onClickHandler}
              textTransform="uppercase"
              variant="outline"
              w="max-content"
              _hover={{
                bg: 'light-bg-primary',
                color: 'dark-text',
                transform: 'scale(0.99)',
              }}
            >
              {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
            {renderTriContentBox()}
            {game.description && (
              <GameContent heading="About">
                <Box
                  dangerouslySetInnerHTML={{ __html: game.description }}
                ></Box>
              </GameContent>
            )}
            {game.website && (
              <GameContent heading="Website">
                <CustomLink link={game.website} title={game.website} />
              </GameContent>
            )}
            {Array.isArray(game.stores) && game.stores.length > 0 && (
              <GameContent heading="Where to buy">
                <Wrap>
                  {game.stores.map((item) => {
                    return (
                      <WrapItem key={item.id}>
                        <Store name={item.store.name} url={item.store.domain} />
                      </WrapItem>
                    );
                  })}
                </Wrap>
              </GameContent>
            )}
          </Stack>
        </Page>
      </Box>
    </Box>
  );
};

export default GameDetail;
