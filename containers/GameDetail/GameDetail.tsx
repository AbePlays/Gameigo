import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react';

import Store from '@/components/Store';
import CustomLink from '@/components/CustomLink';
import GameContent from '@/components/GameContent';
import BoxWithDivider from '@/components/BoxWithDivider';
import { GameInfo } from 'types';
import { formatDate } from 'utils/date';

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
      bg="black"
      mx="2"
      rounded="lg"
    />
  );
};

const GameDetail: FunctionComponent<Props> = ({ game }) => {
  const router = useRouter();
  const clickHandler = () => router.back();

  const renderReleasedandPlaytime = () => {
    return (
      <Wrap spacing={[2, 4]}>
        <WrapItem bg="white" border="1px solid black" px="2" borderRadius="lg">
          {formatDate(game.released)}
        </WrapItem>
        <WrapItem textTransform="uppercase" letterSpacing="widest">
          Average Playtime: {game.playtime} Hours
        </WrapItem>
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
    <Box>
      <Box w="8" cursor="pointer" onClick={clickHandler}>
        <BackArrow />
      </Box>
      <Stack spacing="4" mt="4">
        <Heading as="h1" fontSize={['4xl', '5xl']}>
          {game.name}
        </Heading>
        {renderReleasedandPlaytime()}
        {renderTriContentBox()}
        <GameContent heading="About">
          <Box dangerouslySetInnerHTML={{ __html: game.description }}></Box>
        </GameContent>
        <GameContent heading="Website">
          <CustomLink link={game.website} title={game.website} />
        </GameContent>
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
      </Stack>
    </Box>
  );
};

export default GameDetail;
