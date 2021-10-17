import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { useColorMode, useToast, Stack, Text } from '@chakra-ui/react';

import { ButtonWithIcon } from '@components/Buttons';
import GameCard from '@components/GameCard';
import Loader from '@components/Loader';
import { FadeUpAnimation } from '@utils/animations';
import fetcher from '@utils/fetcher';
import { MotionSimpleGrid } from '@utils/MotionElements';

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
  const isDarkMode = colorMode === 'dark';
  if (!query) return null;

  window.scrollTo(0, 0);

  const { data, error } = useSWR(
    `/api/search?query=${query}&page=${page}`,
    fetcher
  );

  if (error) {
    const toast = useToast();
    toast({
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      status: 'error',
      title: 'Search Failed.',
      variant: isDarkMode ? 'solid' : 'subtle',
    });
  }

  if (!data) {
    return <Loader />;
  }

  const results = data.results;

  return (
    <>
      {Array.isArray(results) && results.length > 0 ? (
        <>
          <MotionSimpleGrid
            maxWidth="1120px"
            minChildWidth="320px"
            mt="0"
            mx="auto"
            px="4"
            spacingX={[4, 4, 6]}
            spacingY="6"
            variants={FadeUpAnimation.parent}
            initial="hidden"
            animate="show"
          >
            {results.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </MotionSimpleGrid>
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
