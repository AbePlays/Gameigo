import { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import Loader from '@components/Loader';
import { useAuth } from '@lib/auth';

interface Props {
  redirectUrl: string;
}

const Protected: FunctionComponent<Props> = ({ children, redirectUrl }) => {
  const { loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push(redirectUrl);
  }, [loading, user]);

  if (loading) return <Loader />;

  return <>{children}</>;
};

export default Protected;
