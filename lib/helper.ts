import type { User as FirebaseUser } from 'firebase/auth';
import { User } from './types';

export function formatUser(firebaseUser: FirebaseUser): User {
  const user = {
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    photoUrl: firebaseUser.photoURL,
    provider: firebaseUser.providerData[0].providerId,
    uid: firebaseUser.uid,
  };

  return user;
}
