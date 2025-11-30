import { Container, Grid, Heading, Link, Text } from '@radix-ui/themes'
import type { Metadata } from 'next'
import NextLink from 'next/link'
import { redirect } from 'next/navigation'
import { parse } from 'valibot'

import GameCard from '@/components/GameCard'
import { NoData } from '@/components/NoData'
import { createClient } from '@/libs/supabase/server'
import { type Game, GameSchema } from '@/schemas/game'

export const metadata: Metadata = {
  title: 'Gameigo | Favorites',
  description:
    'Stop jumping from game to game, and stop having to search for games. Manage your collections, discover new games, and share your collections with friends.',
  openGraph: {
    title: 'Gameigo | Favorites',
    description:
      'Stop jumping from game to game, and stop having to search for games. Manage your collections, discover new games, and share your collections with friends.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gameigo | Favorites',
    description:
      'Stop jumping from game to game, and stop having to search for games. Manage your collections, discover new games, and share your collections with friends.',
  },
}

export default async function Favorites() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/auth')
  }

  const favorites: Game[] = []
  const { data: dbData } = await supabase.from('user_data').select('*').eq('user_id', data.user.id).single()
  if (dbData) {
    const detailsPromise: Promise<number>[] = []
    dbData.favorites.forEach((id: number) => {
      detailsPromise.push(
        fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
          .then((res) => res.json())
          .then((res) => parse(GameSchema, res))
          .then((res) => favorites.push(res))
      )
    })

    await Promise.all(detailsPromise)
  }

  return (
    <Container px={{ initial: '4', sm: '8' }} py="8">
      <Heading as="h1" size={{ initial: '8', sm: '9' }}>
        Favorites
      </Heading>
      {favorites.length > 0 ? (
        <Grid asChild columns="repeat(auto-fill,minmax(300px,1fr))" gap="4" mt="6">
          <ul className="stagger-cards">
            {favorites.map((game, index) => (
              <li key={game.id} style={{ '--i': index } as React.CSSProperties}>
                <Link asChild className="!text-[--gray-12]" underline="none">
                  <NextLink aria-label={game.name} href={`/game/${game.slug}`} prefetch>
                    <GameCard game={game} />
                  </NextLink>
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
      ) : (
        <NoData>
          <Text align="center" as="p" mt="4">
            Please add games to your collection.
          </Text>
        </NoData>
      )}
    </Container>
  )
}
