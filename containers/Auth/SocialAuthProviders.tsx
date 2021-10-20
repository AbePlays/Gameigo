import { FunctionComponent, ReactNode } from 'react';
import { useColorMode, useToast } from '@chakra-ui/react';

import { BrandButton } from '@components/Buttons';
import { useAuth } from '@lib/auth';
import { SOCIALAUTHPROVIDERS } from './constant';
import { SocialAuthProvider } from './types';

const Github = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 640 640"
    >
      <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z" />
    </svg>
  );
};

const Google = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      width="24"
      height="24"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 640 640"
    >
      <path d="M326.331 274.255v109.761h181.49c-7.37 47.115-54.886 138.002-181.49 138.002-109.242 0-198.369-90.485-198.369-202.006 0-111.509 89.127-201.995 198.369-201.995 62.127 0 103.761 26.516 127.525 49.359l86.883-83.635C484.99 31.512 412.741-.012 326.378-.012 149.494-.012 6.366 143.116 6.366 320c0 176.884 143.128 320.012 320.012 320.012 184.644 0 307.256-129.876 307.256-312.653 0-21-2.244-36.993-5.008-52.997l-302.248-.13-.047.024z" />
    </svg>
  );
};

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
            icon = <Google />;
            break;
          case 'github':
            onClickHandler = githubSignInHandler;
            icon = <Github />;
            break;
          default:
            onClickHandler = () => true;
        }
        return (
          <BrandButton
            key={provider.id}
            icon={icon}
            title={provider.title}
            onClick={onClickHandler}
          />
        );
      })}
    </>
  );
};

export default SocialAuthProviders;
