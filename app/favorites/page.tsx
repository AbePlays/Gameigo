import { Container, Heading, Link, Text } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parse } from 'valibot';
import NextLink from 'next/link';

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
    <Container>
      <Heading as="h1">Favorites</Heading>
      {favorites.length > 0 ? (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 mt-8">
          {favorites.map((game) => (
            <li key={game.id}>
              <Link asChild aria-label={game.name} key={game.id}>
                <NextLink href={`/game/${game.slug}`}>
                  <GameCard game={game} />
                </NextLink>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Text>There are no games in your favorites list.</Text>
      )}
    </Container>
  );
}
