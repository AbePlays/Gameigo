import { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import Loader from '@components/Loader';
import { useAuth } from '@lib/auth';
import { Routes } from 'routes';

interface Props {
  children?: React.ReactNode;
  redirectUrl?: string;
}

const Protected: FunctionComponent<Props> = ({ children, redirectUrl = Routes.AUTH_SCREEN }) => {
  const { loaded, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loaded && !user) router.push(redirectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, redirectUrl, user]);

  if (!loaded) return <Loader />;

  if (loaded && !user) return null;

  return <>{children}</>;
};

export default Protected;
