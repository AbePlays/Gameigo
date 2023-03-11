import firebase from './firebase';

export type User = {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
  token?: string;
};

export type AuthContextType = {
  user: User;
  loaded: boolean;
  changeDisplayName: (name: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  signupWithEmailAndPassword: (email: string, password: string, name: string) => Promise<firebase.User>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<firebase.User>;
  signinWithGoogle: () => Promise<firebase.User>;
  signinWithGithub: () => Promise<firebase.User>;
  signout: () => Promise<void>;
};
