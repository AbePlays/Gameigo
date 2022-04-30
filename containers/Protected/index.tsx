import { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import Loader from '@components/Loader';
import { useAuth } from '@lib/auth';
import { Routes } from 'routes';

interface Props {
  children?: React.ReactNode;
  redirectUrl?: string;
}

const Protected: FunctionComponent<Props> = ({
  children,
  redirectUrl = Routes.AUTH_SCREEN,
}) => {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push(redirectUrl);
  }, [loading, redirectUrl, router, user]);

  if (loading) return <Loader />;

  if (!loading && !user) return null;

  return <>{children}</>;
};

export default Protected;
