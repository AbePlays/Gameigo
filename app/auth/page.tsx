import { Container, Link, Text } from '@radix-ui/themes'
import { type Metadata } from 'next'
import { cookies } from 'next/headers'
import NextLink from 'next/link'
import { redirect } from 'next/navigation'

import { createClient } from '@libs/supabase/server'
import { Signin } from './signin'
import { Signup } from './signup'

export const metadata: Metadata = {
  title: 'Gameigo | Auth',
  description:
    'Sign In or Create your Account to start creating your own collection of video games from around the world.',
}

export default async function AuthPage({ searchParams }: { searchParams: Record<string, string> }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/home')
  }

  const { type = '' } = searchParams

  const isSignup = type === 'signup'
  const footer = {
    head: isSignup ? 'Already have an account?' : "Don't have an account?",
    tail: isSignup ? 'Sign in' : 'Sign up',
  }

  return (
    <Container px={{ initial: '4', sm: '8' }} py="8">
      {isSignup ? <Signup /> : <Signin />}

      <Text align="center" as="p" mt="9">
        {footer.head}{' '}
        <Link asChild className="!text-[--accent-11]" weight="bold">
          <NextLink href={`/auth?type=${isSignup ? 'signin' : 'signup'}`}>{footer.tail}</NextLink>
        </Link>{' '}
        instead
      </Text>
    </Container>
  )
}
