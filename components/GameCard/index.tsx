import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { useColorMode, Box, Divider, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react';

import Label from '../Label';
import placeholder from 'public/images/placeholder.jpeg';
import BlurImage from '@components/BlurImage';
import { formatDate } from '@utils/date';
import { MotionBox } from '@utils/MotionElements';

interface Props {
  game: Game;
}

const GameCard: FunctionComponent<Props> = ({ game }) => {
  const { colorMode } = useColorMode();

  const isDarkMode = colorMode === 'dark';

  const renderPlatforms = () => {
    return game?.parent_platforms?.map((item) => <Label title={item.platform.name} key={item.platform.id} />);
  };

  const renderReleasedDate = () => {
    return (
      <Text fontWeight="semibold">
        Release Date:
        <Text as="span" fontWeight="normal" ml="2">
          {game?.released ? formatDate(game.released) : 'TBA'}
        </Text>
      </Text>
    );
  };

  const renderGenres = () => {
    return (
      <Text fontWeight="semibold">
        Genres:
        <Text as="span" fontWeight="normal" ml="2">
          {game?.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
        </Text>
      </Text>
    );
  };

  return (
    <MotionBox
      as="article"
      bg={isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'}
      cursor="pointer"
      h="full"
      overflow="hidden"
      rounded="lg"
      shadow="lg"
      whileHover={{ scale: 1.01 }}
    >
      <NextLink href={`/game/${game.slug}`} legacyBehavior passHref>
        <Link aria-label={`${game.name}`}>
          <Box h="56" overflow="hidden" position="relative">
            <BlurImage alt="game background" fill showBg src={game?.background_image || placeholder} />
          </Box>
          <Box p="4">
            <Heading fontSize="2xl" mb="1">
              {game.name}
            </Heading>
            <Flex wrap="wrap">{renderPlatforms()}</Flex>
            <Stack mt="5">
              {renderReleasedDate()}
              <Divider />
              {renderGenres()}
            </Stack>
          </Box>
        </Link>
      </NextLink>
    </MotionBox>
  );
};

export default GameCard;
