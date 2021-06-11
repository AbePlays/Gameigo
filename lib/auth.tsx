import {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from 'react';

import firebase from './firebase';
import { formatUser } from './helper';
import { AuthContextType, User } from './types';

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);

const useProvideAuth = () => {
  const [user, setUser] = useState<User>(null);

  const handleFirebaseUser = (firebaseUser: firebase.User) => {
    setUser(formatUser(firebaseUser));
    return firebaseUser;
  };

  const signupWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string
  ) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateProfile({ displayName: name });
    return handleFirebaseUser(firebase.auth().currentUser);
  };

  const signinWithGoogle = async () => {
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return handleFirebaseUser(res.user);
  };

  const signinWithGithub = async () => {
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    return handleFirebaseUser(res.user);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return handleFirebaseUser(res.user);
  };

  const signout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(formatUser(user));
      } else {
        setUser(null);
      }
      console.log(user);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signupWithEmailAndPassword,
    loginWithEmailAndPassword,
    signinWithGoogle,
    signinWithGithub,
    signout,
  };
};
