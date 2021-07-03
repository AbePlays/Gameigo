import {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from 'react';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

import { Routes } from '../routes';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const toast = useToast();

  const handleFirebaseUser = (firebaseUser: firebase.User) => {
    setUser(formatUser(firebaseUser));
    setLoading(false);
    router.replace(Routes.HOME_SCREEN);
    return firebaseUser;
  };

  const signupWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase.auth().currentUser.updateProfile({ displayName: name });
    return handleFirebaseUser(firebase.auth().currentUser);
  };

  const signinWithGoogle = async () => {
    setLoading(true);
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return handleFirebaseUser(res.user);
  };

  const signinWithGithub = async () => {
    setLoading(true);
    const res = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    return handleFirebaseUser(res.user);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return handleFirebaseUser(res.user);
  };

  const signout = async () => {
    await firebase.auth().signOut();
    toast({
      title: 'Logout Successful.',
      description: "You've successfully logged out.",
      status: 'success',
      position: 'top',
      duration: 4000,
      isClosable: true,
    });
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(formatUser(user));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signupWithEmailAndPassword,
    loginWithEmailAndPassword,
    signinWithGoogle,
    signinWithGithub,
    signout,
  };
};
