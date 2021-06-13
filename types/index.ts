export type Platform = {
  id: number;
  slug: string;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Game = {
  slug: string;
  id: number;
  name: string;
  released: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
};
