import firebase from './firebase';
import { User } from './types';

export const formatUser = (firebaseUser: firebase.User): User => {
  const user = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    name: firebaseUser.displayName,
    provider: firebaseUser.providerData[0].providerId,
    photoUrl: firebaseUser.photoURL,
  };

  return user;
};
