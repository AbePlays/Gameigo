import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Divider, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';

import { formatDate } from '../../utils/date';
import { Game } from '../../types';
import Label from '../Label';

interface Props {
  game: Game;
}

const GameCard: FunctionComponent<Props> = ({ game }) => {
  const router = useRouter();
  const [showImage, setShowImage] = useState<boolean>(false);
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
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={clickHandler}
      _hover={{
        transform: 'scale(1.01)',
        transition: 'all 150ms ease-in',
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
