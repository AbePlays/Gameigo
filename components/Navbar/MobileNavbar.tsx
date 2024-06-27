import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { DropdownMenu, IconButton, Link, Separator } from '@radix-ui/themes';
import { type User } from '@supabase/supabase-js';
import NextLink from 'next/link';

interface Props {
  user: User | null;
}

function MobileNavbar({ user }: Props) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton className="!sm:hidden" variant="soft">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content color="gray" className="p-2">
        <DropdownMenu.Item asChild>
          <Link asChild>
            <NextLink href="/search">Search</NextLink>
          </Link>
        </DropdownMenu.Item>

        <Separator my="2" size="4" />

        {user ? (
          <>
            <DropdownMenu.Item asChild>
              <Link asChild>
                <NextLink href="/favorites">Favorites</NextLink>
              </Link>
            </DropdownMenu.Item>

            <Separator my="2" size="4" />
          </>
        ) : null}

        <DropdownMenu.Item asChild>
          <Link asChild>
            <NextLink href="/about">About</NextLink>
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export { MobileNavbar };
