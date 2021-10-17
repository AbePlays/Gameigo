import {
  useState,
  useEffect,
  useContext,
  createContext,
  FunctionComponent,
} from 'react';
import { useRouter } from 'next/router';
import { useColorMode, useToast } from '@chakra-ui/react';
import { User as SupabaseUser } from '@supabase/supabase-js';

import { Routes } from 'routes';
import { createUser } from './db';
import { formatUser } from './helper';
import supabase from './supabase';
import { AuthContextType, User } from './types';

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: FunctionComponent = ({ children }) => {
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

  const handleUser = async (supabaseUser: SupabaseUser) => {
    const user = formatUser(supabaseUser);
    await createUser(supabaseUser?.id, user);
    setUser(user);
    setLoading(false);
    router.replace(Routes.HOME_SCREEN);
    return supabaseUser;
  };

  const signupWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string
  ) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(error.message);
    }

    const { user, error: newError } = await supabase.auth.update({
      data: { name },
    });
    if (newError) {
      throw new Error(newError.message);
    }
    if (user) handleUser(user);
  };

  const signinWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      provider: 'google',
    });
    if (error) {
      throw new Error(error.message);
    }
  };

  const signinWithGithub = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      provider: 'github',
    });
    if (error) {
      throw new Error(error.message);
    }
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      throw new Error(error.message);
    }
  };

  const signout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    toast({
      duration: 2000,
      isClosable: true,
      position: 'top-right',
      status: 'success',
      title: 'Logout Successful.',
      variant: isDarkMode ? 'solid' : 'subtle',
    });
    setLoading(false);
  };

  const changePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.update({ password: newPassword });
    if (error) {
      throw new Error(error.message);
    }
  };

  const changeDisplayName = async (newName: string) => {
    const { error } = await supabase.auth.update({ data: { name: newName } });
    if (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    setLoading(true);

    const session = supabase.auth.session();
    if (session) {
      setUser(formatUser(session?.user));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          handleUser(session?.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

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
