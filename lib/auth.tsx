import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
  FunctionComponent,
} from 'react';
import { useRouter } from 'next/router';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
  User as firebaseUser,
} from 'firebase/auth';
import { useColorMode, useToast } from '@chakra-ui/react';

import { Routes } from 'routes';
import { checkUser, createUser } from './db';
import { auth } from './firebase';
import { formatUser } from './helper';
import { AuthContextType, User } from './types';

interface Props {
  children?: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: FunctionComponent<Props> = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useProvideAuth = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  const handleFirebaseUser = useCallback(async (firebaseUser: firebaseUser) => {
    let sessionTimeout = null;
    if (firebaseUser) {
      const userData = formatUser(firebaseUser);
      const user = await checkUser(userData.uid);
      if (!user.exists()) {
        await createUser(userData);
      }
      const res = await firebaseUser.getIdTokenResult();
      const token = res.token;
      userData.token = token;
      const authTime = Number(res.claims.auth_time) * 1000;
      const sessionDuration = 1000 * 60 * 60 * 24; // 24 hours
      const millisecondsUntilExpiration =
        sessionDuration - (Date.now() - authTime);
      sessionTimeout = setTimeout(
        () => auth.signOut(),
        millisecondsUntilExpiration
      );
      setUser(userData);
      router.replace(Routes.HOME_SCREEN);
    } else {
      setUser(null);
      sessionTimeout && clearTimeout(sessionTimeout);
      sessionTimeout = null;
    }
    setLoading(false);
    return firebaseUser;
    // bug in nextjs router
    // https://github.com/vercel/next.js/issues/18127
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      status: 'success',
      title: 'Logout Successful.',
      variant: isDarkMode ? 'solid' : 'subtle',
    });
    setUser(null);
  };

  const changePassword = async (newPassword: string) => {
    const user = auth.currentUser;
    return updatePassword(user, newPassword);
  };

  const changeDisplayName = async (newName: string) => {
    const user = auth.currentUser;
    return updateProfile(user, { displayName: newName });
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      handleFirebaseUser(user);
    });

    return () => unsubscribe();
  }, [handleFirebaseUser]);

  return {
    changeDisplayName,
    changePassword,
    loading,
    loginWithEmailAndPassword,
    signinWithGithub,
    signinWithGoogle,
    signout,
    signupWithEmailAndPassword,
    user,
  };
};
