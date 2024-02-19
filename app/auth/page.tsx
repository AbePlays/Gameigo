import { Container, Link, Text } from '@radix-ui/themes';
import { type Metadata } from 'next';
import { cookies } from 'next/headers';
import NextLink from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from 'libs/supabase/server';
import { Signin } from 'app/auth/signin';
import { Signup } from 'app/auth/signup';

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
    redirect('/home');
  }

  const { type = '' } = searchParams;

  const isLogin = type === 'signin';
  const footer = {
    head: isLogin ? "Don't have an account? " : 'Already have an account? ',
    tail: isLogin ? 'Sign up' : 'Sign in',
  };

  return (
    <Container className="text-center">
      {isLogin ? <Signin /> : <Signup />}

      <Text className="mt-10 font-medium">
        {footer.head}
        <Link asChild>
          <NextLink href={`/auth?type=${isLogin ? 'signup' : 'signin'}`}>{footer.tail}</NextLink>
        </Link>
      </Text>
    </Container>
  );
}
