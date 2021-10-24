type Platform = { id: number; slug: string; name: string };

type Genre = { id: number; name: string };

type Game = {
  background_image: string;
  genres: Genre[];
  id: number;
  name: string;
  parent_platforms: { platform: Platform }[];
  released: string;
  slug: string;
};

type Store = {
  id: number;
  store: { id: number; name: string; domain: string };
};

type Screenshots = {
  count: number;
  results: { id: number; image: string; width: number; height: number }[];
};

type Publisher = {
  id: number;
  name: string;
  slug: string;
};

type GameInfo = {
  background_image: string;
  description: string;
  description_raw: string;
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

type ProfileForm = {
  name: string;
  password: string;
};
