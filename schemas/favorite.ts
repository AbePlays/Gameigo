import { object, pipe, string, transform } from 'valibot'

export const FavoriteSchema = object({
  gameId: pipe(
    string(),
    transform((val) => Number(val))
  ),
  slug: string(),
  userId: string(),
})
