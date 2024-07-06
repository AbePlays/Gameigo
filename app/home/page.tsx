import { Container, Grid, Heading, Link, Text } from '@radix-ui/themes'
import { type Metadata } from 'next'
import NextLink from 'next/link'
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
      }&dates=${getSixMonthsAgoDate()},${getTodaysDate()}&ordering=-added`,
      {
        next: {
          revalidate: 12 * 60 * 60, // 12 hours
        },
      }
    )
    const data = parse(GameSearchSchema, await res.json())
    games = data.results
  } catch (e) {
    console.error(JSON.stringify(e))
  }

  return (
    <Container px={{ initial: '4', sm: '8' }} py="8">
      <Heading as="h1" size={{ initial: '8', sm: '9' }}>
        New and trending
      </Heading>
      <Text as="p" mt="2" size="5" weight="light">
        Based on player counts and release date
      </Text>
      <Grid asChild columns="repeat(auto-fill,minmax(300px,1fr))" gap="4" mt="6">
        <ul className="stagger-cards">
          {games.map((game, index) => (
            <li key={game.id} style={{ '--i': index } as React.CSSProperties}>
              <Link asChild className="!text-[--gray-12]" underline="none">
                <NextLink aria-label={game.name} href={`/game/${game.slug}`}>
                  <GameCard game={game} />
                </NextLink>
              </Link>
            </li>
          ))}
        </ul>
      </Grid>
    </Container>
  )
}
