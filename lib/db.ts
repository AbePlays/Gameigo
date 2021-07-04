import { Game } from 'types';
import firebase from './firebase';
import { User } from './types';

const firestore = firebase.firestore();

export const createUser = (uid: string, data: User) => {
  const docRef = firestore.collection('users').doc(uid);
  docRef.get().then((doc) => {
    if (!doc.exists) {
      return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data, favorites: [] });
    }
  });
};

export const addGame = async (uid: string, data: Game): Promise<void> => {
  const docRef = firestore.collection('users').doc(uid);
  const doc = await docRef.get();
  await docRef.update({
    favorites: [...doc.data().favorites, data],
  });
};

export const deleteGame = async (uid: string, id: number): Promise<void> => {
  const docRef = firestore.collection('users').doc(uid);
  const doc = await docRef.get();
  const { favorites = [] } = doc.data();
  const newFavorites = favorites.filter((item) => item.id !== id);
  await docRef.update({
    favorites: newFavorites,
  });
};

export const checkGame = async (uid: string, id: number): Promise<boolean> => {
  const doc = await firestore.collection('users').doc(uid).get();
  const { favorites = [] } = doc.data();

  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id === id) return true;
  }
  return false;
};
