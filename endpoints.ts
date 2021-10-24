import { getSixMonthsAgoDate, getTodaysDate } from '@utils/date';

const baseUrl = 'https://api.rawg.io/api';
const apiKey = `?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`;

export const Endpoints = {
  TRENDING_GAMES: `${baseUrl}/games${apiKey}&dates=${getSixMonthsAgoDate()},${getTodaysDate()}&ordering=-added`,
  SEARCH_GAME: `${baseUrl}/games`,
  SCREENSHOTS: `${baseUrl}/games`,
};
