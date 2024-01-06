import { Container, Heading, Link, Text } from '@radix-ui/themes';
import NextLink from 'next/link';

import GameCard from '@components/GameCard';
import { convertToGame } from '@utils/game';
import { Endpoints } from 'endpoints';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gameigo | Home',
  description:
    'Gameigo provides a simple user interface and a simple user experience. Explore and take a look at what games are trending at the moment.',
};

export default async function Home() {
  const res = await fetch(Endpoints.TRENDING_GAMES);
  const data = await res.json();
  let games: Game[] = [];
  if (data.results && Array.isArray(data.results)) {
    games = data.results.map((game) => convertToGame(game));
  }

  return (
    <Container>
      <Heading as="h1" size="8">
        New and trending
      </Heading>
      <Text>Based on player counts and release date</Text>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-8">
        {Array.isArray(games) &&
          games.length > 0 &&
          games.map((game) => (
            <Link asChild aria-label={game.name} key={game.id}>
              <NextLink href={`/game/${game.slug}`}>
                <GameCard game={game} />
              </NextLink>
            </Link>
          ))}
      </div>
    </Container>
  );
}
