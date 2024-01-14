import { Container, Link, Text } from '@radix-ui/themes';
import { type Metadata } from 'next';
import NextLink from 'next/link';

import { Login } from 'app/auth/login';
import { Signup } from 'app/auth/signup';

export const metadata: Metadata = {
  title: 'Gameigo | Auth',
  description:
    'Sign In or Create your Account to start creating your own collection of video games from around the world.',
};

export default function AuthPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { type = '' } = searchParams;

  const isLogin = type === 'signin';
  const footer = {
    head: isLogin ? "Don't have an account? " : 'Already have an account? ',
    tail: isLogin ? 'Sign up' : 'Log in',
  };

  return (
    <Container className="text-center">
      {isLogin ? <Login /> : <Signup />}

      <Text className="mt-10 font-medium">
        {footer.head}
        <Link asChild>
          <NextLink href={`/auth?type=${isLogin ? 'signup' : 'signin'}`}>{footer.tail}</NextLink>
        </Link>
      </Text>
    </Container>
  );
}
