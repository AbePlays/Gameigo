import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import GameCard from '@/components/GameCard';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import NoData from '@/components/NoData';
import Page from '@/containers/Page';
import { Endpoints } from 'endpoints';
import img from 'public/images/search_hero.jpeg';
import { Descriptions } from 'seo';
import { Game } from 'types';

const Search: FunctionComponent = () => {
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

  return (
    <Page
      title="Search"
      description={Descriptions.Search}
      maxWidth="1536px"
      px="0"
      py="0"
    >
      <Box position="relative">
        <Box height={['200px', '300px']} overflow="hidden" position="relative">
          <Image layout="fill" objectFit="cover" placeholder="blur" src={img} />
        </Box>
        <Box maxW="container.sm" mx="auto" px="4" transform="translateY(-30px)">
          <Input
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            height="60px"
            placeholder="Search Games"
            value={query}
          />
        </Box>
        <Box
          color="light-text"
          textAlign="center"
          px="4"
          position="absolute"
          width="100%"
          left="0"
          top={[8, 16]}
        >
          <Heading>Search Gameigo</Heading>
          <Text mt={[1, 4]}>
            Choose from 30,000+ games with new addition every few weeks.
          </Text>
        </Box>
      </Box>
      {loading ? (
        <Loader />
      ) : Array.isArray(games) && games.length > 0 ? (
        <SimpleGrid
          maxWidth="1120px"
          minChildWidth="320px"
          mt="0"
          mx="auto"
          px="4"
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
  );
};

export default Search;
