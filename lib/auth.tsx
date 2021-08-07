import {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from 'react';
import { useRouter } from 'next/router';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User as firebaseUser,
} from 'firebase/auth';

import { useToast } from '@chakra-ui/react';

import { Routes } from '../routes';
import { auth } from './firebase';
import { formatUser } from './helper';
import { AuthContextType, User } from './types';
import { createUser } from './db';

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: FunctionComponent = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => useContext(AuthContext);

const useProvideAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>(null);
  const router = useRouter();
  const toast = useToast();

  const handleFirebaseUser = async (firebaseUser: firebaseUser) => {
    await createUser(firebaseUser.uid, formatUser(firebaseUser));
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
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    return handleFirebaseUser(auth.currentUser);
  };

  const signinWithGoogle = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    return handleFirebaseUser(res.user);
  };

  const signinWithGithub = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, new GithubAuthProvider());
    return handleFirebaseUser(res.user);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    return handleFirebaseUser(res.user);
  };

  const signout = async () => {
    await auth.signOut();
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(true);
      if (user) {
        setUser(formatUser(user));
      } else {
        setUser(null);
      }
      setLoading(false);
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
