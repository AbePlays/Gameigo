import { useColorMode, useToast } from '@chakra-ui/react';
import * as Sentry from '@sentry/nextjs';
import { FunctionComponent, ReactNode } from 'react';

import { BrandButton } from '@components/Buttons';
import { IconGithub, IconGoogle } from '@icons';
import { useAuth } from '@lib/auth';
import { SOCIALAUTHPROVIDERS } from './constant';
import { SocialAuthProvider } from './types';

const SocialAuthProviders: FunctionComponent = () => {
  const { signinWithGoogle, signinWithGithub } = useAuth();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const isDarkMode = colorMode === 'dark';

  const googleSignInHandler = async () => {
    try {
      await signinWithGoogle();
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        title: 'Signin Successful.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
    } catch (e) {
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
        title: 'Signin Failed.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      Sentry.captureException(e, {
        level: 'error',
        extra: {
          message: 'Error while signing in with Google',
        },
      });
      console.log(`Error while signing in with Google ${e}`);
    }
  };

  const githubSignInHandler = async () => {
    try {
      await signinWithGithub();
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'success',
        title: 'Signin Successful.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
    } catch (e) {
      toast({
        duration: 2000,
        isClosable: true,
        position: 'top-right',
        status: 'error',
        title: 'Signin Failed.',
        variant: isDarkMode ? 'solid' : 'subtle',
      });
      Sentry.captureException(e, {
        level: 'error',
        extra: {
          message: 'Error while signing in with Github',
        },
      });
      console.log(`Error while signing in with Github ${e}`);
    }
  };

  return (
    <>
      {SOCIALAUTHPROVIDERS.map((provider: SocialAuthProvider) => {
        let onClickHandler: () => void;
        let icon: ReactNode;
        switch (provider.providerId) {
          case 'google':
            onClickHandler = googleSignInHandler;
            icon = <IconGoogle />;
            break;
          case 'github':
            onClickHandler = githubSignInHandler;
            icon = <IconGithub />;
            break;
          default:
            onClickHandler = () => true;
        }
        return <BrandButton key={provider.id} icon={icon} title={provider.title} onClick={onClickHandler} />;
      })}
    </>
  );
};

export default SocialAuthProviders;
