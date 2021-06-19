import { FunctionComponent } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import Page from '@/containers/Page';
import GameDetail from '@/containers/GameDetail';
import { Endpoints } from 'endpoints';
import { GameInfo } from 'types';

interface Props {
  game: GameInfo;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'cyberpunk-2077' } }],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const { slug } = context.params;
  const result = await fetch(
    `${Endpoints.SEARCH_GAME}/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  );
  const data = await result.json();

  return { props: { game: data } };
};

const GameDetailContainer: FunctionComponent<Props> = ({ game }) => {
  return (
    <Page title={game.name}>
      <GameDetail game={game} />
    </Page>
  );
};

export default GameDetailContainer;
