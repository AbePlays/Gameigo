import { FunctionComponent } from 'react';
import { GetStaticProps } from 'next';
import { Box, Text, Heading, SimpleGrid } from '@chakra-ui/layout';

import GameCard from '@/components/GameCard';
import { Game } from '../types';
import { Endpoints } from '../endpoints';

interface Props {
  games: Game[];
}

const Home: FunctionComponent<Props> = ({ games }) => {
  return (
    <Box>
      <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
        New and trending
      </Heading>
      <Text fontSize={['lg', 'xl']}>
        Based on player counts and release date
      </Text>
      <SimpleGrid
        minChildWidth="320px"
        spacingX={[4, 4, 6]}
        spacingY="6"
        mt="8"
      >
        {Array.isArray(games) &&
          games.length > 0 &&
          games.map((game) => <GameCard game={game} key={game.id} />)}
      </SimpleGrid>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(Endpoints.TRENDING_GAMES);
  const data = await res.json();
  return {
    props: {
      games: data.results,
    },
    revalidate: 24 * 60 * 60,
  };
};
export default Home;
