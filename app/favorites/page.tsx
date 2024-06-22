import { Container, Grid, Heading, Text } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { parse } from 'valibot';

import GameCard from '@components/GameCard';
import { createClient } from '@libs/supabase/server';
import { Game, GameSchema } from '@schemas/game';

export default async function Favorites() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect('/auth');
  }

  const favorites: Game[] = [];
  const { data: dbData } = await supabase.from('user_data').select('*').eq('user_id', data.user.id).single();
  if (dbData) {
    const detailsPromise = [];
    dbData.favorites.map((id) => {
      detailsPromise.push(
        fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
          .then((res) => res.json())
          .then((res) => parse(GameSchema, res))
          .then((res) => favorites.push(res))
      );
    });

    await Promise.all(detailsPromise);
  }

  return (
    <Container p={{ initial: '4', sm: '8' }}>
      <Heading as="h1" size="9">
        Favorites
      </Heading>
      {favorites.length > 0 ? (
        <Grid asChild columns="repeat(auto-fill,minmax(300px,1fr))" gap="6" mt="6">
          <ul>
            {favorites.map((game) => (
              <li key={game.id}>
                <Link aria-label={game.name} href={`/game/${game.slug}`}>
                  <GameCard game={game} />
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
      ) : (
        <Text>There are no games in your favorites list.</Text>
      )}
    </Container>
  );
}
