import { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import { useAuth } from 'lib/auth';

interface Props {
  redirectUrl: string;
}

const Protected: FunctionComponent<Props> = ({ children, redirectUrl }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push(redirectUrl);
  }, [user]);

  return <>{loading ? <Loader /> : user && children}</>;
};

export default Protected;
