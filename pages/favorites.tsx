import { FunctionComponent } from 'react';
import { useColorMode, useToast, Box, Heading } from '@chakra-ui/react';
import useSWR from 'swr';

import GameCard from '@components/GameCard';
import LoadingCard from '@components/LoadingCard';
import NoData from '@components/NoData';
import Page from '@containers/Page';
import ProtectedRoute from '@containers/Protected';
import { useAuth } from '@lib/auth';
import fetcher from '@utils/fetcher';
import { Descriptions } from 'seo';

const Favorites: FunctionComponent = () => {
  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';
  const token = user?.token;

  const { data, error } = useSWR(['/api/favorites', token], fetcher);

  if (error) {
    toast({
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      status: 'error',
      title: 'Search Failed.',
      variant: isDarkMode ? 'solid' : 'subtle',
    });
  }

  return (
    <ProtectedRoute>
      <Page title="Favorites" description={Descriptions.Favorites}>
        <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
          Favorites
        </Heading>
        {data ? (
          Array.isArray(data) && data.length > 0 ? (
            <Box className="grid">
              {data.map((game: Game) => (
                <Box key={game.id}>
                  <GameCard game={game} />
                </Box>
              ))}
            </Box>
          ) : (
            <NoData title="Please add games to your collection." />
          )
        ) : (
          <Box className="grid">
            <LoadingCard count={6} />
          </Box>
        )}
      </Page>
    </ProtectedRoute>
  );
};

export default Favorites;
