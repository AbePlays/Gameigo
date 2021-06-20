import { FunctionComponent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

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

  return <>{loading ? <Text>Loading...</Text> : user && children}</>;
};

export default Protected;
