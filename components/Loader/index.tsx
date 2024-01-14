import { Box, Flex } from '@radix-ui/themes';

export function Loader() {
  return (
    <Flex align="center" justify="center" mx="4" my="8">
      <Box className="loader" data-testid="loader">
        <svg viewBox="0 0 80 80">
          <circle id="test" cx="40" cy="40" r="32"></circle>
        </svg>
      </Box>
    </Flex>
  );
}
