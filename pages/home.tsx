import { FunctionComponent } from 'react';
import { GetStaticProps } from 'next';
import { Box } from '@chakra-ui/layout';

import GameCard from '@/components/GameCard';
import { Game } from '../types';
import { Endpoints } from '../endpoints';

interface Props {
  games: Game[];
}

const Home: FunctionComponent<Props> = ({ games }) => {
  return (
    <Box>
      {Array.isArray(games) &&
        games.length > 0 &&
        games.map((game) => <GameCard game={game} key={game.id} />)}
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
