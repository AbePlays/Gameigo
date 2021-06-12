const baseUrl = 'https://api.rawg.io/api';
const apiKey = `?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;

export const Endpoints = {
  TRENDING_GAMES: `${baseUrl}/games${apiKey}&dates=2021-10-10,2021-10-10&ordering=-added`,
};
