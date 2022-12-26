import { Box, Stack, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import useSWR from 'swr';

import { ButtonWithIcon } from '@components/Buttons';
import GameCard from '@components/GameCard';
import LoadingCard from '@components/LoadingCard';
import fetcher from '@utils/fetcher';

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  page: number;
  query: string;
}

export default function SearchResult({ onNext, onPrevious, page, query }: Props) {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  const { data, error } = useSWR<{ next: string; previous: string; results: Game[] }>(
    `/api/search?query=${query}&page=${page}`,
    fetcher
  );

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, [page]);

  if (error) {
    toast({
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      status: 'error',
      title: 'Search Failed.',
      variant: isDarkMode ? 'solid' : 'subtle',
    });

    return null;
  }

  if (!data) {
    return (
      <Box className="grid" maxW="1120px" mt="0" mx="auto" px="4">
        <LoadingCard count={6} />
      </Box>
    );
  }

  const results = data.results;

  return (
    <>
      {Array.isArray(results) && results.length > 0 ? (
        <>
          <Box className="grid" maxWidth="1120px" mt="0" mx="auto" px="4">
            {results.map((game) => (
              <GameCard game={game} key={game.id} query={query} />
            ))}
          </Box>
          <Stack isInline alignItems="center" justifyContent="center" mt="8" spacing="8">
            <ButtonWithIcon isDisabled={data.previous === null} title="Previous" width="100px" onClick={onPrevious} />
            <Text as="span" fontSize="lg">
              {page}
            </Text>
            <ButtonWithIcon isDisabled={data.next === null} title="Next" width="100px" onClick={onNext} />
          </Stack>
        </>
      ) : null}
    </>
  );
}
