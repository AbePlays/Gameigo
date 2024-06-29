import { Container, Grid, Heading, Text } from '@radix-ui/themes'
import { type Metadata } from 'next'
import Link from 'next/link'
import { parse } from 'valibot'

import GameCard from '@components/GameCard'
import { getSixMonthsAgoDate, getTodaysDate } from '@utils/date'
import { Game, GameSearchSchema } from 'schemas/game'

export const metadata: Metadata = {
  title: 'Gameigo | Home',
  description:
    'Gameigo provides a simple user interface and a simple user experience. Explore and take a look at what games are trending at the moment.',
}

export default async function Home() {
  let games: Game[] = []
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.NEXT_PUBLIC_RAWG_API_KEY
      }&dates=${getSixMonthsAgoDate()},${getTodaysDate()}&ordering=-added`
    )
    const data = parse(GameSearchSchema, await res.json())
    games = data.results
  } catch (e) {
    console.error(JSON.stringify(e))
  }

  return (
    <Container p={{ initial: '4', sm: '8' }}>
      <Heading as="h1" size="9">
        New and trending
      </Heading>
      <Text as="p" mt="2" size="5" weight="light">
        Based on player counts and release date
      </Text>
      <Grid asChild columns="repeat(auto-fill,minmax(300px,1fr))" gap="6" mt="6">
        <ul>
          {games.map((game) => (
            <li key={game.id}>
              <Link aria-label={game.name} href={`/game/${game.slug}`}>
                <GameCard game={game} />
              </Link>
            </li>
          ))}
        </ul>
      </Grid>
    </Container>
  )
}
