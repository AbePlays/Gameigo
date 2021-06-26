const baseUrl = 'https://api.rawg.io/api';
const apiKey = `?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;

export const Endpoints = {
  TRENDING_GAMES: `${baseUrl}/games${apiKey}&dates=2020-06-12,2021-06-12&ordering=-added`,
  SEARCH_GAME: `${baseUrl}/games`,
};
