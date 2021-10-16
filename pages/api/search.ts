import { NextApiRequest, NextApiResponse } from 'next';

import { Endpoints } from 'endpoints';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  try {
    const { query } = req.query;
    if (typeof query === 'string') {
      const response = await fetch(
        `${Endpoints.SEARCH_GAME}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}`
      );
      const data = await response.json();
      return res.status(200).json(data);
    }
    res.status(500).json({ error: 'invalid query' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
