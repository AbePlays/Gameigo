import { User as firebaseUser } from 'firebase/auth';
import { User } from './types';

export const formatUser = (firebaseUser: firebaseUser): User => {
  const user = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    provider: firebaseUser.providerData[0].providerId,
    photoUrl: firebaseUser.photoURL,
  };

  return user;
};
