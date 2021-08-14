export type Platform = { id: number; slug: string; name: string };

export type Genre = { id: number; name: string };

export type Game = {
  background_image: string;
  genres: Genre[];
  id: number;
  name: string;
  parent_platforms: { platform: Platform }[];
  released: string;
  slug: string;
};

export type Store = {
  id: number;
  store: { id: number; name: string; domain: string };
};

export type Screenshots = {
  count: number;
  results: { id: number; image: string; width: number; height: number }[];
};

export type Publisher = {
  id: number;
  name: string;
  slug: string;
};

export type GameInfo = {
  background_image: string;
  description: string;
  genres: Genre[];
  id: number;
  metacritic: number;
  name: string;
  parent_platforms: { platform: Platform }[];
  playtime: number;
  publishers: Publisher[];
  released: string;
  slug: string;
  stores: Store[];
  website: string;
};
