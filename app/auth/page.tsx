import { Button, Container, Text } from '@radix-ui/themes';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { Signin } from 'app/auth/signin';
import { Signup } from 'app/auth/signup';
import { createClient } from 'libs/supabase/server';
import { signout } from './actions';

export const metadata: Metadata = {
  title: 'Gameigo | Auth',
  description:
    'Sign In or Create your Account to start creating your own collection of video games from around the world.',
};

export default async function AuthPage({ searchParams }: { searchParams: Record<string, string> }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    return (
      <form action={signout}>
        <Button type="submit">Logout</Button>
      </form>
    );
  }

  const { type = '' } = searchParams;

  const isLogin = type === 'signin';
  const footer = {
    head: isLogin ? "Don't have an account? " : 'Already have an account? ',
    tail: isLogin ? 'Sign up' : 'Sign in',
  };

  return (
    <Container p={{ initial: '4', sm: '8' }}>
      {isLogin ? <Signin /> : <Signup />}

      <Text align="center" as="p" mt="9">
        {footer.head}
        <Link className="font-bold" href={`/auth?type=${isLogin ? 'signup' : 'signin'}`}>
          {footer.tail}
        </Link>{' '}
        instead
      </Text>
    </Container>
  );
}
