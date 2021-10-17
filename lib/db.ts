import supabase from './supabase';

import { User } from './types';

export const createUser = async (uid: string, user: User): Promise<any> => {
  const { data, error } = await supabase.from('users').select().eq('uid', uid);
  if (error) {
    console.log(error);
  }

  if (data.length === 0) {
    return supabase
      .from('users')
      .insert([{ uid, name: user.name, email: user.email, favorites: [] }]);
  }
};

export const addGame = async (uid: string, gameData: Game): Promise<any> => {
  const { data, error } = await supabase.from('users').select().eq('uid', uid);
  if (error) {
    console.log(error);
  }

  const currUserData = data[0];
  const { favorites = [] } = currUserData;

  const newFavorites = [...favorites, gameData];
  return supabase
    .from('users')
    .update({ favorites: newFavorites })
    .eq('uid', uid);
};

export const deleteGame = async (uid: string, id: number): Promise<any> => {
  const { data, error } = await supabase.from('users').select().eq('uid', uid);
  if (error) {
    console.log(error);
  }

  const currUserData = data[0];
  const { favorites = [] } = currUserData;

  const newFavorites = favorites.filter((item) => item.id !== id);
  return supabase
    .from('users')
    .update({ favorites: newFavorites })
    .eq('uid', uid);
};

export const checkGame = async (uid: string, id: number): Promise<boolean> => {
  const { data, error } = await supabase.from('users').select().eq('uid', uid);
  if (error) {
    console.log(error);
  }

  const currUserData = data[0];
  const { favorites = [] } = currUserData;

  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id === id) return true;
  }
  return false;
};

export const getUserData = async (uid: string): Promise<any> => {
  const { data, error } = await supabase.from('users').select().eq('uid', uid);
  if (error) {
    console.log(error);
  }

  return data[0];
};
