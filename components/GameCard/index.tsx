import { Badge, Box, Flex, Grid, Text } from '@radix-ui/themes';

import BlurImage from '@components/BlurImage';
import { formatDate } from '@utils/date';
import placeholder from 'public/images/placeholder.jpeg';
import { Game } from 'schemas/game';

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  // const { colorMode } = useColorMode();
  const colorMode: string = 'light';

  const isDarkMode = colorMode === 'dark';

  return (
    <Box
      className={`${isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'} shadow-lg rounded-lg group`}
      overflow="hidden"
      height="100%"
    >
      <Box height="14rem" overflow="hidden" position="relative">
        <BlurImage
          alt="game background"
          className="group-hover:scale-105"
          fill
          showBg
          src={game?.background_image || placeholder}
        />
      </Box>
      <Box p="4">
        <Text size="6" weight="bold">
          {game.name}
        </Text>

        <Flex wrap="wrap" gap="2" mt="2">
          {game.parent_platforms.map((item) => (
            <Badge color="gray" highContrast key={item.platform.id} size="3" variant="solid">
              {item.platform.name}
            </Badge>
          ))}
        </Flex>

        <Grid mt="4" gap="2">
          <Flex gap="2">
            <Text weight="medium">Release Date:</Text>
            <Text weight="light">{formatDate(game.released)}</Text>
          </Flex>

          <hr />

          <Flex gap="2">
            <Text weight="medium">Genres:</Text>
            <Text weight="light">{game.genres?.map((genre) => genre.name).join(', ') || 'N/A'}</Text>
          </Flex>
        </Grid>
      </Box>
    </Box>
  );
}
