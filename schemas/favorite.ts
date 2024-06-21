import { object, string, transform } from 'valibot';

export const FavoriteSchema = object({
  gameId: transform(string(), (val) => Number(val)),
  slug: string(),
  userId: string(),
});
