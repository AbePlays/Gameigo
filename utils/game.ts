export const convertToGame = (data: GameInfo): Game => {
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
