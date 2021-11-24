import { rest } from 'msw';

import { mockGame, mockGameInfo, mockScreenshots } from '../mockData';

const handlers = [
  rest.get('/api/search', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 123,
        next: 'some_url',
        previous: 'some_url',
        results: [mockGame],
      })
    );
  }),
  rest.get('/api/favorites', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([mockGame]));
  }),
  rest.get('https://api.rawg.io/api/games', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ results: [mockGame] }));
  }),
  rest.get(
    `https://api.rawg.io/api/games/${mockGame.slug}`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockGameInfo));
    }
  ),
  rest.get(
    `https://api.rawg.io/api/games/${mockGame.slug}/screenshots`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockScreenshots));
    }
  ),
];

export { handlers };
