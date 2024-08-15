import { Avatar, Button, Container, Flex, Heading, Text } from '@radix-ui/themes'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { createClient } from '@libs/supabase/server'
import { signout } from './actions'
import { ChangeName } from './change-name'
import { ChangePassword } from './change-password'

export const metadata: Metadata = {
  title: 'Gameigo | Profile',
  description: 'Manage your profile, change your password and access many other settings on this page.',
  openGraph: {
    title: 'Gameigo | Profile',
    description: 'Manage your profile, change your password and access many other settings on this page.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gameigo | Profile',
    description: 'Manage your profile, change your password and access many other settings on this page.',
  },
}

export default async function Profile() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/auth')
  }

  return (
    <Container px={{ initial: '4', sm: '8' }} py="8" size="2">
      <Heading as="h1" size={{ initial: '8', sm: '9' }}>
        Profile
      </Heading>
      <Flex align="center" gap="4" mt="6">
        <Avatar
          fallback={data.user.user_metadata.name[0]}
          radius="full"
          size="4"
          src={data.user.user_metadata.avatar_url}
        />
        <Text size="6" weight="bold">
          {data.user.user_metadata.name}
        </Text>
      </Flex>

      <ChangeName />

      <ChangePassword />

      <form action={signout}>
        <Button color="red" mt="6" size="3" type="submit">
          Logout
        </Button>
      </form>
    </Container>
  )
}
