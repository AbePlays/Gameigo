import { FunctionComponent } from 'react';
import { GetStaticProps } from 'next';
import { Heading, Text } from '@chakra-ui/react';

import Page from '@containers/Page';
import GameCard from '@components/GameCard';
import { FadeUpAnimation } from '@utils/animations';
import { MotionSimpleGrid } from '@utils/MotionElements';
import { Endpoints } from 'endpoints';
import { Descriptions } from 'seo';

interface Props {
  games: Game[];
}

const Home: FunctionComponent<Props> = ({ games }) => {
  return (
    <Page title="Home" description={Descriptions.Home}>
      <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
        New and trending
      </Heading>
      <Text fontSize={['lg', 'xl']}>
        Based on player counts and release date
      </Text>
      <MotionSimpleGrid
        animate="show"
        initial="hidden"
        minChildWidth="320px"
        mt="8"
        spacingX={[4, 4, 6]}
        spacingY="6"
        variants={FadeUpAnimation.parent}
      >
        {Array.isArray(games) &&
          games.length > 0 &&
          games.map((game) => <GameCard game={game} key={game.id} />)}
      </MotionSimpleGrid>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(Endpoints.TRENDING_GAMES);
  const data = await res.json();
  return {
    props: { games: data.results },
    revalidate: 12 * 60 * 60, // 12 hours
  };
};
export default Home;
