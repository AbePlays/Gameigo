import { Badge, Box, Card, Flex, Grid, Inset, Separator, Text } from '@radix-ui/themes';

import BlurImage from '@components/BlurImage';
import { formatDate } from '@utils/date';
import placeholder from 'public/images/placeholder.jpeg';
import { Game } from 'schemas/game';

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  return (
    <Card className="h-full shadow-lg rounded-lg group">
      <Inset side="top">
        <Box height="14rem" overflow="hidden" position="relative">
          <BlurImage
            alt="game background"
            className="group-hover:scale-105"
            fill
            showBg
            src={game?.background_image || placeholder}
          />
        </Box>
      </Inset>
      <Box p="2">
        <Text className="block" mt="2" size="6" weight="bold">
          {game.name}
        </Text>

        {Array.isArray(game.parent_platforms) && game.parent_platforms.length > 0 ? (
          <Flex wrap="wrap" gap="2" mt="2">
            {game.parent_platforms.map((item) => (
              <Badge color="gray" highContrast key={item.platform.id} size="3" variant="solid">
                {item.platform.name}
              </Badge>
            ))}
          </Flex>
        ) : null}

        <Grid mt="4" gap="2">
          <Flex gap="2">
            <Text weight="medium">Release Date:</Text>
            <Text weight="light">{game.released ? formatDate(game.released) : 'TBA'}</Text>
          </Flex>

          <Separator size="4" />

          <Flex gap="2">
            <Text weight="medium">Genres:</Text>
            <Text weight="light">{game.genres?.map((genre) => genre.name).join(', ') || 'N/A'}</Text>
          </Flex>
        </Grid>
      </Box>
    </Card>
  );
}
