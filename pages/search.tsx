import { Box, Heading, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import BlurImage from '@components/BlurImage';
import Input from '@components/Input';
import SearchResult from '@components/SearchResult';
import Page from '@containers/Page';
import img from 'public/images/search_hero.jpeg';
import { Descriptions } from 'seo';

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(() => {
    const { searchTerm = '' } = router.query;
    if (typeof searchTerm === 'string') {
      return searchTerm;
    }
    return '';
  });

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      event.target?.blur();
      setQuery(inputRef.current?.value);
      setPage(1);
    }
  };

  const decrementPage = () => setPage((prev) => prev - 1);
  const incrementPage = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = query;
    }
  }, [query]);

  useEffect(() => {
    function focusInput(event: KeyboardEvent) {
      if (event.key === '/') {
        inputRef.current?.focus();
        event.preventDefault();
      }
    }

    window.addEventListener('keydown', focusInput);

    return function cleaup() {
      window.removeEventListener('keydown', focusInput);
    };
  }, []);

  return (
    <Page title="Search" description={Descriptions.Search} maxWidth="1536px" px="0" pt="0">
      <Box position="relative">
        {/* Background Image */}
        <Box height={['200px', '300px']} overflow="hidden" pos="relative">
          <BlurImage alt="" fill style={{ objectPosition: 'top' }} showBg src={img} />
        </Box>

        {/* Intro Text */}
        <Box color="light-text" textAlign="center" px="4" position="absolute" width="100%" left="0" top={[8, 16]}>
          <Heading as="h1">Search Gameigo</Heading>
          <Text fontSize={['md', 'lg']} fontWeight="medium" mt={[1, 4]}>
            Choose from 30,000+ games with new addition every few weeks.
          </Text>
        </Box>

        {/* Search Input */}
        <Box maxW="container.sm" mx="auto" px="4" transform="translateY(-25px)">
          <InputGroup>
            <InputLeftElement height="100%" pl="2" pointerEvents="none">
              <MagnifyingGlassIcon color="gray" height={20} width={20} />
            </InputLeftElement>
            <Input
              height="50px"
              onKeyDown={keyDownHandler}
              paddingLeft="10"
              placeholder="Search Games"
              ref={inputRef}
            />
          </InputGroup>
        </Box>
      </Box>

      {/* Search Results */}
      {query ? <SearchResult query={query} page={page} onNext={incrementPage} onPrevious={decrementPage} /> : null}

      {/* For preloading next page */}
      {query ? (
        <Box display="none">
          <SearchResult query={query} page={page + 1} onNext={incrementPage} onPrevious={decrementPage} />
        </Box>
      ) : null}
    </Page>
  );
}
