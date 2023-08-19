import { Box, Skeleton, Stack, useColorMode } from '@chakra-ui/react';

interface Props {
  count?: number;
}

export default function LoadingCard({ count = 1 }: Props) {
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
                <Stack direction="row" spacing="4">
                  <Skeleton startColor="gray.300" endColor="gray.500" h="8" w="20" />
                  <Skeleton startColor="gray.300" endColor="gray.500" h="8" w="20" />
                </Stack>
                <Skeleton startColor="gray.300" endColor="gray.500" h="6" />
                <Skeleton startColor="gray.300" endColor="gray.500" h="6" />
              </Stack>
            </Box>
          );
        })}
    </>
  );
}
