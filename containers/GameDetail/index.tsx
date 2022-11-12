import {
  Box,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorMode,
  useToast,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { ArrowLeftIcon, BookmarkFilledIcon, BookmarkIcon, Share1Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import BlurImage from '@components/BlurImage';
import BoxWithDivider from '@components/BoxWithDivider';
import CustomLink from '@components/CustomLink';
import GameContent from '@components/GameContent';
import Store from '@components/Store';
import Page from '@containers/Page';
import { useAuth } from '@lib/auth';
import { addGame, checkGame, deleteGame } from '@lib/db';
import { formatDate } from '@utils/date';
import { convertToGame } from '@utils/game';

interface Props {
  game: GameInfo;
  screenshots: Screenshots;
}

function CustomDivider({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <Box
      alignSelf="center"
      bg={isDarkMode ? 'white' : 'black'}
      display={['none', 'none', 'block']}
      flexShrink={0}
      height="10"
      width="1"
      mx="2"
      rounded="lg"
    />
  );
}

export default function GameDetail({ game, screenshots }: Props) {
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

  useEffect(() => {
    if (user) {
      checkGame(user.uid, game.id).then((res) => setIsFav(res));
    }
  }, [game.id, user]);

  return (
    <Page
      description={game.description_raw}
      imageUrl={game.background_image}
      siteLink={`/game/${game.slug}`}
      title={game.name}
      pt={[4, 4, 12]}
    >
      {/* CTAs */}
      <Flex alignItems="center" justifyContent="space-between">
        <Box aria-label="Go Back" as="button" onClick={clickHandler} w="6" title="Back">
          <ArrowLeftIcon height={24} width={24} />
        </Box>
        <Flex alignItems="center" justifyContent="center">
          {user ? (
            <Box
              aria-label={`${isFav ? 'UnFavorite' : 'Favorite'}`}
              as="button"
              w="6"
              onClick={onClickHandler}
              mr="2"
              title={isFav ? 'Unfavorite' : 'Favorite'}
            >
              {isFav ? <BookmarkFilledIcon height={20} width={20} /> : <BookmarkIcon height={20} width={20} />}
            </Box>
          ) : null}
          <IconButton
            aria-label="Share"
            display="flex"
            fontSize="xl"
            icon={<Share1Icon height={20} width={20} />}
            onClick={copyLink}
            title="Share"
            variant="unstyled"
          />
        </Flex>
      </Flex>

      {/* Header */}
      <Box mt="16" textAlign="center">
        <Text fontWeight="medium">Day of Release - {game.released ? formatDate(game.released) : 'TBA'}</Text>
        <Heading as="h1" fontSize={['5xl', '6xl']} lineHeight="1.25" mt="8">
          {game.name}
        </Heading>
      </Box>

      {/* Game Background */}
      <Box bg={isDarkMode ? 'dark-bg-secondary' : 'grey'} mt="8" p={['8', '8', '10']} rounded="2xl">
        <Box pos="relative" rounded="xl" overflow="hidden">
          <BlurImage height="400" width="1200" showBg src={game.background_image} alt="game background" />
        </Box>
      </Box>

      {/* Game Info */}
      <Stack spacing="4">
        <Box mt="8">
          <Stack direction={['column', 'column', 'row']} py="4" textAlign="center">
            <Box w="full">
              <Heading as="h2" fontSize={['2xl', '3xl']}>
                Platforms
              </Heading>
              <Wrap justify="center" spacing="0" mt="2" w={['full', 'full', 4 / 5]} mx="auto">
                {game.parent_platforms.map((item, index) => (
                  <WrapItem key={item.platform.id}>
                    <BoxWithDivider id={index} title={item.platform.name} />
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
            <CustomDivider isDarkMode={isDarkMode} />
            <Box w="full">
              <Heading as="h2" fontSize={['2xl', '3xl']}>
                Metacritic Score
              </Heading>
              <Text mt="2">{game.metacritic || '-'}</Text>
            </Box>
            <CustomDivider isDarkMode={isDarkMode} />
            <Box w="full">
              <Heading as="h2" fontSize={['2xl', '3xl']}>
                Genres
              </Heading>
              <Wrap justify="center" spacing="0" mt="2" w={['full', 'full', 4 / 5]} mx="auto">
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
        </Box>

        {game.description && (
          <GameContent heading="About">
            <Box dangerouslySetInnerHTML={{ __html: game.description }} lineHeight="1.8" />
          </GameContent>
        )}

        {game.publishers.length > 0 && (
          <GameContent heading="Publishers">
            <Wrap spacing="0">
              {game.publishers.map((item, index) => {
                return (
                  <WrapItem key={item.id}>
                    <BoxWithDivider id={index} title={item.name} />
                  </WrapItem>
                );
              })}
            </Wrap>
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

        {screenshots.count > 0 && (
          <GameContent heading="Screenshots">
            <UnorderedList
              className="no-scrollbar"
              display="flex"
              gap="6"
              m="0"
              overflowX="auto"
              scrollSnapType="x mandatory"
            >
              {screenshots.results.map((item) => {
                return (
                  <ListItem flexShrink={0} key={item.id} listStyleType="none" scrollSnapAlign="start">
                    <Flex h={200} rounded="md" overflow="hidden" pos="relative" w={360}>
                      <BlurImage alt={`game-screenshot-${item.id}`} fill showBg src={item.image} />
                    </Flex>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </GameContent>
        )}
      </Stack>
    </Page>
  );
}
