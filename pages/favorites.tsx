import { Box, Heading, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import useSWR from 'swr';

import GameCard from '@components/GameCard';
import LoadingCard from '@components/LoadingCard';
import NoData from '@components/NoData';
import Page from '@containers/Page';
import ProtectedRoute from '@containers/Protected';
import { useAuth } from '@lib/auth';
import fetcher from '@utils/fetcher';
import { Descriptions } from 'seo';

export default function Favorites() {
  const { user } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';
  const token = user?.token;

  const { data, error } = useSWR<Game[]>(['/api/favorites', token], fetcher);

  useEffect(() => {
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
  }, [error, isDarkMode, toast]);

  return (
    <ProtectedRoute>
      <Page title="Favorites" description={Descriptions.Favorites}>
        <Heading as="h1" fontSize={['4xl', '5xl', '6xl']}>
          Favorites
        </Heading>
        {data ? (
          Array.isArray(data) && data.length > 0 ? (
            <Box className="grid">
              {data.map((game) => (
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
}
