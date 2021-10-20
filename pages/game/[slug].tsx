import { FunctionComponent } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';

import GameDetail from '@containers/GameDetail';
import { convertToGameInfo } from '@utils/game';
import { Endpoints } from 'endpoints';

interface Props {
  data: {
    game: GameInfo;
    screenshots: Screenshots;
  };
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
  const gameDetailsReq = fetch(
    `${Endpoints.SEARCH_GAME}/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  ).then((res) => res.json());

  const screenshotsReq = fetch(
    `${Endpoints.SCREENSHOTS}/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
  ).then((res) => res.json());

  const [gameDetails, screenshots] = await Promise.all([
    gameDetailsReq,
    screenshotsReq,
  ]);

  const data = {
    game: convertToGameInfo(gameDetails),
    screenshots,
  };

  return { props: { data } };
};

const GameDetailContainer: FunctionComponent<Props> = ({ data }) => {
  return <GameDetail game={data?.game} screenshots={data?.screenshots} />;
};

export default GameDetailContainer;
