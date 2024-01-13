import { Flex, Heading, Text } from '@radix-ui/themes';

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
    <div
      className={`${
        isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'
      } shadow-lg h-full rounded-lg overflow-hidden`}
    >
      <div className="relative h-56">
        <BlurImage alt="game background" fill showBg src={game?.background_image || placeholder} />
      </div>
      <div className="p-4">
        <Heading mb="1">{game.name}</Heading>

        <Flex wrap="wrap">
          {game?.parent_platforms?.map((item) => <Text key={item.platform.id}>{item.platform.name}</Text>)}
        </Flex>

        <div className="mt-5">
          <div>
            <Text className="font-semibold">Release Date:</Text>
            <Text ml="2">
              {game?.released ? <time dateTime={game.released}>{formatDate(game.released)}</time> : 'TBA'}
            </Text>
          </div>

          <hr className="my-2" />

          <div>
            <Text className="font-semibold">Genres:</Text>
            <Text ml="2">{game?.genres?.map((genre) => genre.name).join(', ') || 'N/A'}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
