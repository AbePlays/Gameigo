import { NextApiRequest, NextApiResponse } from 'next';

import { getUserData } from 'lib/db-admin';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  try {
    const { uid } = req.headers;
    if (typeof uid === 'string') {
      const { favorites } = await getUserData(uid);
      return res.status(200).json(favorites);
    }
    res.status(500).json({ error: 'invalid uid' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
