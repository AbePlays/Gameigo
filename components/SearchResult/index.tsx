import { FunctionComponent } from 'react';
import useSWR from 'swr';
import { useColorMode, useToast, Stack, Text } from '@chakra-ui/react';

import { ButtonWithIcon } from '@components/Buttons';
import GameCard from '@components/GameCard';
import Loader from '@components/Loader';
import { FadeUpAnimation } from '@utils/animations';
import fetcher from '@utils/fetcher';
import { MotionBox } from '@utils/MotionElements';

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
    return <Loader />;
  }

  const results = data.results;

  return (
    <>
      {Array.isArray(results) && results.length > 0 ? (
        <>
          <MotionBox
            className="grid"
            maxWidth="1120px"
            mt="0"
            mx="auto"
            px="4"
            variants={FadeUpAnimation.parent}
            animate="show"
            initial="hidden"
          >
            {results.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </MotionBox>
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
