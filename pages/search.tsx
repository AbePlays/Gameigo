import { FunctionComponent, useState } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import GameCard from '@/components/GameCard';
import Input from '@/components/Input';
import NoData from '@/components/NoData';
import Page from '@/containers/Page';
import ProtectedRoute from '@/containers/Protected';
import { Endpoints } from 'endpoints';
import { Routes } from 'routes';
import { Game } from 'types';

const Search: FunctionComponent = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isPristine, setIsPristine] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const changeHandler = (event) => setQuery(event.target.value);

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      fetchGames();
    }
  };

  const fetchGames = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${Endpoints.SEARCH_GAME}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}`
      );
      const data = await res.json();
      setIsPristine(false);
      setGames(data.results);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute redirectUrl={Routes.AUTH_SCREEN}>
      <Page title="Search">
        <Box maxW="container.sm" mx="auto">
          <Input
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            placeholder="Search Games"
            value={query}
          />
        </Box>
        {loading ? (
          <Text>Loading...</Text>
        ) : Array.isArray(games) && games.length > 0 ? (
          <SimpleGrid
            minChildWidth="320px"
            mt="8"
            spacingX={[4, 4, 6]}
            spacingY="6"
          >
            {games.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </SimpleGrid>
        ) : (
          !isPristine && (
            <NoData
              title="Sorry, couldn't find any results for your query"
              mt="8"
            />
          )
        )}
      </Page>
    </ProtectedRoute>
  );
};

export default Search;
