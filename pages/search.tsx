import { FunctionComponent, useRef, useState } from 'react';
import Image from 'next/image';
import { Box, Heading, Text } from '@chakra-ui/react';

import Input from '@/components/Input';
import SearchResult from '@/components/SearchResult';
import Page from '@/containers/Page';
import img from 'public/images/search_hero.jpeg';
import { Descriptions } from 'seo';

const Search: FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      event.target?.blur();
      setQuery(inputRef.current?.value);
      setPage(1);
    }
  };

  const decrementPage = () => setPage((prev) => prev - 1);
  const incrementPage = () => setPage((prev) => prev + 1);

  return (
    <Page
      title="Search"
      description={Descriptions.Search}
      maxWidth="1536px"
      px="0"
      pt="0"
    >
      <Box position="relative">
        <Box height={['200px', '300px']} overflow="hidden" position="relative">
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="top"
            placeholder="blur"
            src={img}
          />
        </Box>
        <Box maxW="container.sm" mx="auto" px="4" transform="translateY(-30px)">
          <Input
            ref={inputRef}
            onKeyDown={keyDownHandler}
            height="60px"
            placeholder="Search Games"
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
      <SearchResult
        query={query}
        page={page}
        onNext={incrementPage}
        onPrevious={decrementPage}
      />
    </Page>
  );
};

export default Search;
