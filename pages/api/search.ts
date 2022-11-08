import { NextApiRequest, NextApiResponse } from 'next';

import { Endpoints } from 'endpoints';

const search = async (req: NextApiRequest, res: NextApiResponse): Promise<unknown> => {
  try {
    const { page, query } = req.query;
    if (typeof query === 'string' && typeof page === 'string') {
      const response = await fetch(
        `${Endpoints.SEARCH_GAME}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}&page=${page}&page_size=10`
      );
      const data = await response.json();
      return res.status(200).json(data);
    }
    res.status(500).json({ error: 'invalid query or page number' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default search;
