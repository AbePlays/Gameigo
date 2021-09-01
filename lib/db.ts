import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { Game } from 'types';
import { db } from './firebase';
import { User } from './types';

export const createUser = async (uid: string, data: User): Promise<any> => {
  console.log(uid);
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return setDoc(doc(db, 'users', uid), {
      uid,
      ...data,
      favorites: [],
    });
  }
};

export const addGame = async (uid: string, data: Game): Promise<void> => {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    favorites: arrayUnion(data),
  });
};

export const deleteGame = async (uid: string, id: number): Promise<void> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  const { favorites = [] } = docSnap.data();
  const newFavorites = favorites.filter((item) => item.id !== id);
  await updateDoc(docRef, {
    favorites: newFavorites,
  });
};

export const checkGame = async (uid: string, id: number): Promise<boolean> => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  const { favorites = [] } = docSnap.data();

  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id === id) return true;
  }
  return false;
};
