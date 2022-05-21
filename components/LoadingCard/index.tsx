import { FunctionComponent } from 'react';
import { useColorMode, Box, Skeleton, Stack } from '@chakra-ui/react';

interface Props {
  count?: number;
}

const LoadingCard: FunctionComponent<Props> = ({ count = 1 }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => {
          return (
            <Box
              aria-hidden="true"
              bg={isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'}
              data-testid="loading-card"
              key={index}
              overflow="hidden"
              rounded="lg"
              shadow="lg"
            >
              <Skeleton startColor="gray.300" endColor="gray.500" h="56" />
              <Stack p="4" spacing="4">
                <Skeleton startColor="gray.300" endColor="gray.500" h="8" />
                <Stack isInline spacing="4">
                  <Skeleton
                    startColor="gray.300"
                    endColor="gray.500"
                    h="8"
                    w="20"
                  />
                  <Skeleton
                    startColor="gray.300"
                    endColor="gray.500"
                    h="8"
                    w="20"
                  />
                </Stack>
                <Skeleton startColor="gray.300" endColor="gray.500" h="6" />
                <Skeleton startColor="gray.300" endColor="gray.500" h="6" />
              </Stack>
            </Box>
          );
        })}
    </>
  );
};

export default LoadingCard;
