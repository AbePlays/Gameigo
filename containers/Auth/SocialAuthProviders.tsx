import { FunctionComponent } from 'react';

import { BrandButton } from '@/components/Buttons';
import { useAuth } from '../../lib/auth';
import { SocialAuthProvider } from './types';
import { SOCIALAUTHPROVIDERS } from './constant';

const SocialAuthProviders: FunctionComponent = () => {
  const { signinWithGoogle, signinWithGithub } = useAuth();

  const googleSignInHandler = async () => {
    try {
      await signinWithGoogle();
    } catch (e) {
      console.log(`Error while signing in with Google ${e}`);
    }
  };

  const githubSignInHandler = async () => {
    try {
      await signinWithGithub();
    } catch (e) {
      console.log(`Error while signing in with Github ${e}`);
    }
  };

  return (
    <>
      {SOCIALAUTHPROVIDERS.map((provider: SocialAuthProvider) => {
        let onClickHandler: () => void;
        switch (provider.providerId) {
          case 'google':
            onClickHandler = googleSignInHandler;
            break;
          case 'github':
            onClickHandler = githubSignInHandler;
            break;
          default:
            onClickHandler = () => true;
        }
        return (
          <BrandButton
            key={provider.id}
            imgSrc={provider.imgSrc}
            title={provider.title}
            onClick={onClickHandler}
          />
        );
      })}
    </>
  );
};

export default SocialAuthProviders;
