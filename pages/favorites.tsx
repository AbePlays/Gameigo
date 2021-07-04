import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { Heading, SimpleGrid } from '@chakra-ui/react';

import GameCard from '@/components/GameCard';
import Page from '@/containers/Page';
import ProtectedRoute from '@/containers/Protected';
import { useAuth } from 'lib/auth';
import { Routes } from 'routes';
import fetcher from 'utils/fetcher';

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
    return <p>Loading...</p>;
  }

  return (
    <ProtectedRoute redirectUrl={Routes.AUTH_SCREEN}>
      <Page title="Favorites">
        <Heading as="h1" fontSize={['4xl', '5xl']}>
          Favorites
        </Heading>
        <SimpleGrid
          columns={[1, 2, 3]}
          mt="8"
          spacingX={[4, 4, 6]}
          spacingY="6"
        >
          {Array.isArray(data) && data.length > 0 ? (
            data.map((game) => <GameCard game={game} key={game.id} />)
          ) : (
            <p>No data</p>
          )}
        </SimpleGrid>
      </Page>
    </ProtectedRoute>
  );
};

export default Favorites;
