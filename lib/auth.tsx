import { useColorMode, useToast } from '@chakra-ui/react';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { createContext, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { preload } from 'swr';

import fetcher from '@utils/fetcher';
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
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'RESOLVED'>('IDLE');
  const [user, setUser] = useState<User>(null);
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  const handleFirebaseUser = useCallback(async (firebaseUser: FirebaseUser) => {
    setStatus('PENDING');
    let sessionTimeout = null;
    if (firebaseUser) {
      const userData = formatUser(firebaseUser);
      const user = await checkUser(userData.uid);
      if (!user.exists()) {
        await createUser(userData);
      }
      const idTokenResult = await firebaseUser.getIdTokenResult();
      const { claims, token } = idTokenResult;
      userData.token = token;
      const authTime = Number(claims.auth_time) * 1000;
      const sessionDuration = 1000 * 60 * 60 * 24; // 24 hours
      const millisecondsUntilExpiration = sessionDuration - (Date.now() - authTime);
      sessionTimeout = setTimeout(() => auth.signOut(), millisecondsUntilExpiration);
      setUser(userData);
      preload(['/api/favorites', token], fetcher);
      router.replace(Routes.HOME_SCREEN);
    } else {
      setUser(null);
      sessionTimeout && clearTimeout(sessionTimeout);
      sessionTimeout = null;
    }
    setStatus('RESOLVED');
    return firebaseUser;
    // bug in nextjs router
    // https://github.com/vercel/next.js/issues/18127
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signupWithEmailAndPassword = useCallback(
    async (email: string, password: string, name: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      return handleFirebaseUser(auth.currentUser);
    },
    [handleFirebaseUser]
  );

  const signinWithGoogle = useCallback(async () => {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    return handleFirebaseUser(res.user);
  }, [handleFirebaseUser]);

  const signinWithGithub = useCallback(async () => {
    const res = await signInWithPopup(auth, new GithubAuthProvider());
    return handleFirebaseUser(res.user);
  }, [handleFirebaseUser]);

  const loginWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return handleFirebaseUser(res.user);
    },
    [handleFirebaseUser]
  );

  const signout = useCallback(async () => {
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
  }, [isDarkMode, toast]);

  const changePassword = useCallback(async (newPassword: string) => {
    const user = auth.currentUser;
    return updatePassword(user, newPassword);
  }, []);

  const changeDisplayName = useCallback(async (newName: string) => {
    const user = auth.currentUser;
    return updateProfile(user, { displayName: newName });
  }, []);

  useEffect(() => {
    setStatus('PENDING');
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      await handleFirebaseUser(user);
      setStatus('RESOLVED');
    });

    return () => unsubscribe();
  }, [handleFirebaseUser]);

  const loaded = status === 'RESOLVED';

  return useMemo(
    () => ({
      changeDisplayName,
      changePassword,
      loaded,
      loginWithEmailAndPassword,
      signinWithGithub,
      signinWithGoogle,
      signout,
      signupWithEmailAndPassword,
      user,
    }),
    [
      changeDisplayName,
      changePassword,
      loaded,
      loginWithEmailAndPassword,
      signinWithGithub,
      signinWithGoogle,
      signout,
      signupWithEmailAndPassword,
      user,
    ]
  );
};
