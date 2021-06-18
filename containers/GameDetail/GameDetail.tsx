import { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Text } from '@chakra-ui/react';

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

const GameDetail: FunctionComponent<Props> = ({ game }) => {
  const router = useRouter();

  const clickHandler = () => router.back();

  return (
    <Box>
      <Box w="8" cursor="pointer" onClick={clickHandler}>
        <BackArrow />
      </Box>
      <Heading as="h1">{game.name}</Heading>
      <Text>{formatDate(game.released)}</Text>
      <Text>Average Playtime: {game.playtime} Hours</Text>
      <Heading>About</Heading>
      <Box dangerouslySetInnerHTML={{ __html: game.description }}></Box>
      <Heading>Website</Heading>
      <Text>{game.website}</Text>
      <Heading>Where to buy</Heading>
      {game.stores.map((store) => {
        return <Text key={store.id}>{store.store.name}</Text>;
      })}
    </Box>
  );
};

export default GameDetail;
