import { createClient } from '@libs/supabase/server'
import { Avatar, Container, Flex, Link, Text, Tooltip } from '@radix-ui/themes'
import { cookies } from 'next/headers'
import NextLink from 'next/link'

import { MobileNavbar } from './MobileNavbar'
import { ThemeSwitcher } from './ThemeSwitcher'

async function Navbar() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data } = await supabase.auth.getUser()
  const { user } = data

  return (
    <Container className="shadow z-10 bg-[--color-background]" maxWidth="80rem" position="sticky" top="0">
      <Flex align="center" justify="between" mx="auto" p="4">
        <MobileNavbar user={user} />

        <Link asChild underline="none">
          <NextLink className="!font-semibold !text-[--gray-12] !tracking-widest" href="/home">
            GAMEIGO
          </NextLink>
        </Link>

        <Flex display={{ initial: 'none', sm: 'flex' }} gap="8">
          <Link asChild underline="none" weight="medium">
            <NextLink className="!text-[--gray-12] hover:opacity-50" href="/search">
              Search
            </NextLink>
          </Link>

          {user ? (
            <Link asChild underline="none" weight="medium">
              <NextLink className="!text-[--gray-12] hover:opacity-50" href="/favorites">
                Favorites
              </NextLink>
            </Link>
          ) : (
            <Tooltip content="Please login first">
              <Text className="opacity-50" weight="medium">
                Favorites
              </Text>
            </Tooltip>
          )}

          <Link asChild underline="none" weight="medium">
            <NextLink className="!text-[--gray-12] hover:opacity-50" href="/about">
              About
            </NextLink>
          </Link>
        </Flex>

        <Flex gap="3">
          <ThemeSwitcher />

          <Link asChild underline="none">
            <NextLink href={user ? '/profile' : '/auth'}>
              <Avatar
                fallback={user ? user.user_metadata.name[0] : 'U'}
                size="2"
                src={user ? user.user_metadata.avatar_url : null}
              />
            </NextLink>
          </Link>
        </Flex>
      </Flex>
    </Container>
  )
}

export { Navbar }
