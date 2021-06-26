import { FunctionComponent, useState } from 'react';
import { Box, Input, SimpleGrid, Text } from '@chakra-ui/react';

import GameCard from '@/components/GameCard';
import Page from '@/containers/Page';
import ProtectedRoute from '@/containers/Protected';
import { Endpoints } from 'endpoints';
import { Routes } from 'routes';
import { Game } from 'types';

const Search: FunctionComponent = () => {
  const [games, setGames] = useState<Game[]>([]);
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
      console.log(data);
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
            placeholder="Search Games"
            value={query}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            focusBorderColor="black"
          />
        </Box>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <SimpleGrid
            minChildWidth="320px"
            spacingX={[4, 4, 6]}
            spacingY="6"
            mt="8"
          >
            {Array.isArray(games) &&
              games.length > 0 &&
              games.map((game) => <GameCard game={game} key={game.id} />)}
          </SimpleGrid>
        )}
      </Page>
    </ProtectedRoute>
  );
};

export default Search;
