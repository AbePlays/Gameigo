import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import { Heading } from '@chakra-ui/react';
import nookies from 'nookies';

import GameCard from '@/components/GameCard';
import NoData from '@/components/NoData';
import Page from '@/containers/Page';
import { auth } from 'lib/firebase-admin';
import { Game } from 'types';
import { FadeUpAnimation } from 'utils/animations';
import fetcher from 'utils/fetcher';
import { MotionSimpleGrid } from 'utils/MotionElements';
import { Descriptions } from 'seo';

interface Props {
  data: Game[];
}

const Favorites: FunctionComponent<Props> = ({ data }) => {
  return (
    <Page title="Favorites" description={Descriptions.Favorites}>
      <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
        Favorites
      </Heading>
      {Array.isArray(data) && data.length > 0 ? (
        <MotionSimpleGrid
          animate="show"
          columns={[1, 2, 3]}
          initial="hidden"
          mt="8"
          spacingX={[4, 4, 6]}
          spacingY="6"
          variants={FadeUpAnimation.parent}
        >
          {data.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </MotionSimpleGrid>
      ) : (
        <NoData title="Please add games to your collection." />
      )}
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { token } = nookies.get(ctx);
    const { uid } = await auth.verifyIdToken(token);
    const data = await fetcher('https://gameigo.vercel.app/api/favorites', uid);
    return {
      props: { data },
    };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
};

export default Favorites;
