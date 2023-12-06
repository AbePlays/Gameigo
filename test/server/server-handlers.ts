import { HttpResponse, http } from 'msw';

import { mockGame, mockGameInfo, mockScreenshots } from '../mockData';

const handlers = [
  http.get('/api/search', () => {
    return HttpResponse.json({
      count: 123,
      next: 'some_url',
      previous: 'some_url',
      results: [mockGame],
    });
  }),
  http.get('/api/favorites', () => {
    return HttpResponse.json([mockGame]);
  }),
  http.get('https://api.rawg.io/api/games', () => {
    return HttpResponse.json({ results: [mockGame] });
  }),
  http.get(`https://api.rawg.io/api/games/${mockGame.slug}`, () => {
    return HttpResponse.json(mockGameInfo);
  }),
  http.get(`https://api.rawg.io/api/games/${mockGame.slug}/screenshots`, () => {
    return HttpResponse.json(mockScreenshots);
  }),
];

export { handlers };
