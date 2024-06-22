import { createClient } from '@libs/supabase/server';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Avatar, Container, Flex, IconButton, Text, Tooltip } from '@radix-ui/themes';
import { cookies } from 'next/headers';
import Link from 'next/link';

import { ThemeSwitcher } from './ThemeSwitcher';

async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  const { user } = data;

  // const [showMobileNav, setShowMobileNav] = useState(false);
  const showMobileNav = false;

  // const toggleNav = () => setShowMobileNav((prev) => !prev);

  return (
    <Container className="shadow z-10 bg-[--color-background]" maxWidth="100rem" position="sticky" top="0">
      <Flex align="center" justify="between" mx="auto" p="4">
        <IconButton
          aria-label="Menu"
          aria-expanded={showMobileNav ? 'true' : 'false'}
          className="flex !sm:hidden"
          // onClick={toggleNav}
        >
          {showMobileNav ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </IconButton>

        <Link className="font-semibold tracking-widest" href="/home">
          GAMEIGO
        </Link>

        <div className="hidden sm:flex sm:flex-row gap-8 sm:gap-12">
          <Link className="font-medium hover:opacity-50" href="/search">
            Search
          </Link>

          {user ? (
            <Link className="cursor-pointer opacity-100 font-medium hover:opacity-50" href="/favorites">
              Favorites
            </Link>
          ) : (
            <Tooltip content="Please login first">
              <Text className="opacity-50 font-medium hover:opacity-50">Favorites</Text>
            </Tooltip>
          )}

          <Link className="font-medium hover:opacity-50" href="/about">
            About
          </Link>
        </div>

        <Flex gap="3">
          <ThemeSwitcher />
          <Link href={user ? '/auth' : '/auth'}>
            <Avatar fallback={user ? user.user_metadata.name[0] : 'U'} radius="full" size="2" />
          </Link>
        </Flex>
      </Flex>
      {/* <AnimatePresence mode="wait">{showMobileNav ? <MobileNavbar onClick={toggleNav} /> : null}</AnimatePresence> */}
    </Container>
  );
}

export { Navbar };
