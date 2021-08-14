import { Game, GameInfo } from 'types';

export const convertToGameInfo = (data: any): GameInfo => {
  const game = {
    background_image: data?.background_image,
    description: data?.description,
    genres: data?.genres,
    id: data?.id,
    metacritic: data?.metacritic,
    name: data?.name,
    parent_platforms: data?.parent_platforms,
    publishers: data?.publishers,
    playtime: data?.playtime,
    released: data?.released,
    slug: data?.slug,
    stores: data?.stores,
    website: data?.website,
  };

  return game;
};

export const convertToGame = (data: any): Game => {
  const game: Game = {
    background_image: data?.background_image,
    genres: data?.genres,
    id: data?.id,
    name: data?.name,
    parent_platforms: data?.parent_platforms,
    released: data?.released,
    slug: data?.slug,
  };

  return game;
};
