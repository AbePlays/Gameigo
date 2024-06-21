'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { parse } from 'valibot';

import { createClient } from '@libs/supabase/server';
import { FavoriteSchema } from '@schemas/favorite';

export async function toggleFavorite(_, formData: FormData) {
  const fields = Object.fromEntries(formData.entries());
  const { gameId, slug, userId } = parse(FavoriteSchema, fields);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('user_data').select('*').eq('user_id', userId).single();
  if (!data) {
    await supabase.from('user_data').insert({ user_id: userId, favorites: [gameId] });
  } else {
    const { favorites } = data;
    const updatedFavorites = favorites.includes(gameId)
      ? favorites.filter((id) => id !== gameId)
      : [...favorites, gameId];
    await supabase.from('user_data').update({ favorites: updatedFavorites }).eq('user_id', userId);
  }
  revalidatePath(`/game/${slug}`);
}
