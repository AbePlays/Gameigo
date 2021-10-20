import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '@lib/firebase-admin';
import { getUserData } from '@lib/db-admin';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<unknown> => {
  try {
    const { token } = req.headers;
    if (typeof token === 'string') {
      const { uid } = await auth.verifyIdToken(token);
      const { favorites } = await getUserData(uid);
      return res.status(200).json(favorites);
    }
    res.status(500).json({ error: 'invalid token' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
