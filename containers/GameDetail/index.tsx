import { FunctionComponent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { LinkIcon } from '@chakra-ui/icons';
import {
  useColorMode,
  useToast,
  Box,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import BoxWithDivider from '@components/BoxWithDivider';
import CustomLink from '@components/CustomLink';
import GameContent from '@components/GameContent';
import Store from '@components/Store';
import Page from '@containers/Page';
import { IconArrowBack, IconHeartFilled, IconHeartOutline } from '@icons';
import { useAuth } from '@lib/auth';
import { addGame, checkGame, deleteGame } from '@lib/db';
import { formatDate } from '@utils/date';
import { convertToGame } from '@utils/game';

interface Props {
  game: GameInfo;
  screenshots: Screenshots;
}

const CustomDivider = () => {
  return (
    <Box
      alignSelf="center"
      bg="white"
      display={['none', 'none', 'block']}
      flexShrink={0}
      height="10"
      width="1"
      mx="2"
      rounded="lg"
    />
  );
};

const GameDetail: FunctionComponent<Props> = ({ game, screenshots }) => {
  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [isFav, setIsFav] = useState<boolean>(false);
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        duration: 2000,
        isClosable: false,
        position: 'top-right',
        status: 'success',
        title: 'Copied to Clipboard.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = async () => {
    try {
      if (isFav) {
        await deleteGame(user.uid, game.id);
        toast({
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
          title: 'Collection Updated.',
          variant: isDarkMode ? 'solid' : 'subtle',
        });
        setIsFav(false);
      } else {
        await addGame(user.uid, convertToGame(game));
        toast({
          duration: 2000,
          isClosable: true,
          position: 'top-right',
          status: 'success',
          title: 'Collection Updated.',
          variant: isDarkMode ? 'solid' : 'subtle',
        });
        setIsFav(true);
      }
    } catch (e) {
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
        title: 'Update Failed.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      console.log(e);
    }
  };

  const clickHandler = () => router.back();

  const renderReleasedandPlaytime = () => {
    return (
      <Wrap spacing={[2, 4]}>
        {game.released ? (
          <WrapItem bg="white" color="black" px="2" borderRadius="lg">
            {formatDate(game.released)}
          </WrapItem>
        ) : null}
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
          <Text mt="2">{game.metacritic || '-'}</Text>
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

  useEffect(() => {
    if (user) {
      checkGame(user.uid, game.id).then((res) => setIsFav(res));
    }
  }, [user]);

  return (
    <Box bg="black" color="white" position="relative">
      <Box position="absolute" top={['4', '4', '12']} w="full" zIndex="1">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          maxW="1120px"
          mx="auto"
          px="4"
        >
          <Box w="8" as="button" onClick={clickHandler}>
            <IconArrowBack />
          </Box>
          <Flex alignItems="center" justifyContent="center">
            {user ? (
              <Box w="7" as="button" onClick={onClickHandler} mr="2">
                {isFav ? <IconHeartFilled /> : <IconHeartOutline />}
              </Box>
            ) : null}
            <IconButton
              aria-label="Share"
              icon={<LinkIcon />}
              fontSize="2xl"
              onClick={copyLink}
              variant="unstyled"
            />
          </Flex>
        </Flex>
      </Box>
      <Box display={['none', 'none', 'block']} pos="absolute" inset="0">
        <Box
          w="100%"
          h="calc(100vh - 64px)"
          position="relative"
          filter="brightness(40%)"
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
      <Box display={['block', 'block', 'none']} h="300px" position="relative">
        <Image
          src={game.background_image}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="game background"
        />
      </Box>
      <Box position="relative">
        <Page
          description={game.description_raw}
          imageUrl={game.background_image}
          pt={['0', '0', '24']}
          siteLink={`/game/${game.slug}`}
          title={game.name}
        >
          <Stack spacing="4" mt="4">
            <Heading as="h1" fontSize={['4xl', '5xl']}>
              {game.name}
            </Heading>
            {renderReleasedandPlaytime()}
            {renderTriContentBox()}
            {game.description && (
              <GameContent heading="About">
                <Box
                  dangerouslySetInnerHTML={{ __html: game.description }}
                  lineHeight="1.8"
                ></Box>
              </GameContent>
            )}
            {game.website && (
              <GameContent heading="Website">
                <CustomLink link={game.website} title={game.website} />
              </GameContent>
            )}
            {game.publishers.length > 0 && (
              <GameContent heading="Publishers">
                <Wrap>
                  {game.publishers.map((item) => {
                    return (
                      <WrapItem key={item.id}>
                        <Text>{item.name}</Text>
                      </WrapItem>
                    );
                  })}
                </Wrap>
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
            {screenshots.count > 0 && (
              <GameContent heading="Screenshots">
                <SimpleGrid
                  minChildWidth="320px"
                  spacingX={[4, 4, 6]}
                  spacingY="6"
                >
                  {screenshots.results.map((item) => {
                    return (
                      <Flex key={item.id} rounded="sm" overflow="hidden">
                        <Image
                          alt={`game-screenshot-${item.id}`}
                          src={item.image}
                          width={item.width}
                          objectFit="cover"
                          height={item.height}
                        />
                      </Flex>
                    );
                  })}
                </SimpleGrid>
              </GameContent>
            )}
          </Stack>
        </Page>
      </Box>
    </Box>
  );
};

export default GameDetail;