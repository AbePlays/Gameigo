import { Container, Heading, Link, Text } from '@radix-ui/themes';
import { type Metadata } from 'next';
import NextLink from 'next/link';
import { parse } from 'valibot';

import GameCard from '@components/GameCard';
import { getSixMonthsAgoDate, getTodaysDate } from '@utils/date';
import { Game, GameSearchSchema } from 'schemas/game';

export const metadata: Metadata = {
  title: 'Gameigo | Home',
  description:
    'Gameigo provides a simple user interface and a simple user experience. Explore and take a look at what games are trending at the moment.',
};

export default async function Home() {
  let games: Game[] = [];
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.NEXT_PUBLIC_RAWG_API_KEY
      }&dates=${getSixMonthsAgoDate()},${getTodaysDate()}&ordering=-added`
    );
    const data = parse(GameSearchSchema, await res.json());
    games = data.results;
  } catch (e) {
    console.error(JSON.stringify(e));
  }

  return (
    <Container>
      <Heading size="8">New and trending</Heading>
      <Text>Based on player counts and release date</Text>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-8">
        {games.map((game) => (
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
