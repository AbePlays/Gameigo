import { FunctionComponent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Box, SimpleGrid } from '@chakra-ui/react';

import GameCard from '@/components/GameCard';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import Page from '@/containers/Page';
import ProtectedRoute from '@/containers/Protected';
import { Endpoints } from 'endpoints';
import { Routes } from 'routes';
import { Game } from 'types';

interface Props {
  showResults: boolean;
}

const Search: FunctionComponent<Props> = ({ showResults = false }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isPristine, setIsPristine] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const changeHandler = (event) => setQuery(event.target.value);

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      event.target?.blur();
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
      localStorage.setItem('searchResults', JSON.stringify(data.results));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showResults) {
      const searchResults = localStorage.getItem('searchResults');
      setGames(JSON.parse(searchResults));
    }
  }, []);

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
          <Loader />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const routes = ['home', 'favorites', 'about', 'profile'];
  let showResults = true;
  for (const route of routes) {
    if (ctx.req.headers.referer.indexOf(route) >= 0) {
      showResults = false;
      break;
    }
  }
  return { props: { showResults } };
};

export default Search;
