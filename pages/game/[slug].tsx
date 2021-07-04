import { FunctionComponent } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import GameDetail from '@/containers/GameDetail';
import ProtectedRoute from '@/containers/Protected';
import { Endpoints } from 'endpoints';
import { Routes } from 'routes';
import { GameInfo } from 'types';
import { convertToGameInfo } from 'utils/game';

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
  const game = convertToGameInfo(data);
  return { props: { game } };
};

const GameDetailContainer: FunctionComponent<Props> = ({ game }) => {
  return (
    <ProtectedRoute redirectUrl={Routes.AUTH_SCREEN}>
      <GameDetail game={game} />
    </ProtectedRoute>
  );
};

export default GameDetailContainer;
