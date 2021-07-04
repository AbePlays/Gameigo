export type Platform = { id: number; slug: string; name: string };

export type Genre = { id: number; name: string };

export type Game = {
  slug: string;
  id: number;
  name: string;
  released: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
};

export type Store = {
  id: number;
  store: { id: number; name: string; domain: string };
};

export type GameInfo = {
  id: number;
  slug: string;
  name: string;
  description: string;
  released: string;
  background_image: string;
  website: string;
  metacritic: number;
  playtime: number;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
  stores: Store[];
};
