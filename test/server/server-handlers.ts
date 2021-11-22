import { rest } from 'msw';

import { mockGame } from '../mockData';

const handlers = [
  rest.get('/api/search', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 123,
        next: 'some_url',
        previous: null,
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
];

export { handlers };
