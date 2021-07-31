import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { Heading } from '@chakra-ui/react';

import GameCard from '@/components/GameCard';
import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import Page from '@/containers/Page';
import ProtectedRoute from '@/containers/Protected';
import { useAuth } from 'lib/auth';
import { Routes } from 'routes';
import fetcher from 'utils/fetcher';
import { MotionSimpleGrid } from 'utils/MotionElements';
import { FadeUpAnimation } from 'utils/animations';

const Favorites: FunctionComponent = () => {
  const { user } = useAuth();
  const { data, error } = useSWR(
    user ? ['/api/favorites', user.uid] : null,
    fetcher
  );

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <Loader />;
  }

  return (
    <ProtectedRoute redirectUrl={Routes.AUTH_SCREEN}>
      <Page title="Favorites">
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
    </ProtectedRoute>
  );
};

export default Favorites;
