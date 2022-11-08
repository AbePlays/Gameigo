import { db } from './firebase-admin';

export const getUserData = async (uid: string): Promise<FirebaseFirestore.DocumentData> => {
  const docs = await db.collection('users').doc(uid).get();
  return docs.data();
};
