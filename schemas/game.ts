import { InferInput, array, boolean, nullish, number, object, string } from 'valibot';

export const GameSchema = object({
  background_image: nullish(string()),
  genres: nullish(array(object({ id: number(), name: string() }))),
  id: number(),
  metacritic: nullish(number()),
  name: string(),
  parent_platforms: nullish(array(object({ platform: object({ id: number(), name: string() }) }))),
  platforms: nullish(array(object({ platform: object({ id: number(), name: string() }) }))),
  playtime: number(),
  released: nullish(string()),
  slug: string(),
  stores: nullish(array(object({ store: object({ id: number(), name: string() }) }))),
  tba: boolean(),
});

export const GameDetailSchema = object({
  ...GameSchema.entries,
  description: string(),
  publishers: nullish(array(object({ id: number(), name: string() }))),
  website: string(),
});

export const GameSearchSchema = object({
  count: number(),
  next: nullish(string()),
  previous: nullish(string()),
  results: array(GameSchema),
});

export const GameScreenshotSchema = object({
  count: number(),
  results: array(object({ id: number(), image: string() })),
});

export type Game = InferInput<typeof GameSchema>;
export type GameDetail = InferInput<typeof GameDetailSchema>;
export type GameSearchResult = InferInput<typeof GameSearchSchema>;
export type GameScreenshot = InferInput<typeof GameScreenshotSchema>;
