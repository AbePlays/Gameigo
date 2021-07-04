import { useState, FunctionComponent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  useColorMode,
  Box,
  Divider,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';

import Label from '../Label';
import { Game } from '../../types';
import { formatDate } from '../../utils/date';

interface Props {
  game: Game;
}

const GameCard: FunctionComponent<Props> = ({ game }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [showImage, setShowImage] = useState<boolean>(false);

  const isDarkMode = colorMode === 'dark';
  const toggleImage = () => setShowImage((prev) => !prev);

  const renderImage = () => {
    if (game.background_image)
      return (
        <Image
          src={game.background_image}
          alt="game background"
          layout="fill"
          onLoad={toggleImage}
          objectFit="cover"
        />
      );
  };

  const renderPlatforms = () => {
    return game.parent_platforms.map((item) => (
      <Label title={item.platform.name} key={item.platform.id} />
    ));
  };

  const renderReleasedDate = () => {
    return (
      <Text fontWeight="semibold">
        Release Date:
        <Text as="span" fontWeight="normal" ml="2">
          {formatDate(game.released) || 'N/A'}
        </Text>
      </Text>
    );
  };

  const renderGenres = () => {
    return (
      <Text fontWeight="semibold">
        Genres:
        <Text as="span" fontWeight="normal" ml="2">
          {game.genres.map((genre) => genre.name).join(', ') || 'N/A'}
        </Text>
      </Text>
    );
  };

  const clickHandler = () => router.push(`/game/${game.slug}`);

  return (
    <Box
      bg={isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'}
      cursor="pointer"
      onClick={clickHandler}
      overflow="hidden"
      rounded="lg"
      shadow="lg"
      _hover={{
        transform: 'scale(1.01)',
        shadow: 'xl',
      }}
    >
      <Box h="56" position="relative">
        {!showImage && <Skeleton h="full" />}
        {renderImage()}
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
    </Box>
  );
};

export default GameCard;
