import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { useColorMode, useToast, Box, Stack, Text } from '@chakra-ui/react';

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

const SearchResult: FunctionComponent<Props> = ({
  onNext,
  onPrevious,
  page,
  query,
}) => {
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  window.scrollTo(0, 0);

  const { data, error } = useSWR(
    `/api/search?query=${query}&page=${page}`,
    fetcher
  );

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
              <GameCard game={game} key={game.id} />
            ))}
          </Box>
          <Stack
            isInline
            alignItems="center"
            justifyContent="center"
            mt="8"
            spacing="8"
          >
            <ButtonWithIcon
              icon={null}
              isDisabled={data.previous === null}
              title="Previous"
              width="100px"
              onClick={onPrevious}
            />
            <Text as="span" fontSize="lg">
              {page}
            </Text>
            <ButtonWithIcon
              icon={null}
              isDisabled={data.next === null}
              title="Next"
              width="100px"
              onClick={onNext}
            />
          </Stack>
        </>
      ) : null}
    </>
  );
};

export default SearchResult;
