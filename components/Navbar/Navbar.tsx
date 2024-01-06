import { Cross1Icon, HamburgerMenuIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Avatar, Flex, IconButton, Link, Tooltip } from '@radix-ui/themes';
import NextLink from 'next/link';

function Navbar() {
  // const { user } = useAuth();
  const user = null;
  // const { colorMode, toggleColorMode } = useColorMode();
  const colorMode: string = 'light';

  // const [showMobileNav, setShowMobileNav] = useState(false);
  const showMobileNav = false;

  const isDarkMode = colorMode === 'dark';

  // const toggleNav = () => setShowMobileNav((prev) => !prev);

  return (
    <div className="adaptive-glass sticky shadow-sm top-0 z-10">
      <Flex align="center" justify="between" mx="auto" p="4">
        <IconButton
          aria-label="Menu"
          aria-expanded={showMobileNav ? 'true' : 'false'}
          className="flex !sm:hidden"
          // onClick={toggleNav}
        >
          {showMobileNav ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </IconButton>

        <Link asChild className="font-semibold tracking-widest">
          <NextLink href="/home">GAMEIGO</NextLink>
        </Link>

        <div className="hidden sm:flex sm:flex-row gap-8 sm:gap-12">
          <Link asChild className="font-medium hover:opacity-50">
            <NextLink href="/search">Search</NextLink>
          </Link>

          <Tooltip content="Please login first" disableHoverableContent={user}>
            <Link
              asChild
              className={`${
                user ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-50'
              } font-medium hover:opacity-50`}
            >
              <NextLink href={user ? '/favorites' : '#'}>Favorites</NextLink>
            </Link>
          </Tooltip>

          <Link asChild className="font-medium hover:opacity-50">
            <NextLink href="/about">About</NextLink>
          </Link>
        </div>

        <Flex gap="3">
          <IconButton
            aria-label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            // onClick={toggleColorMode}
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>

          <Link asChild>
            <NextLink href={user ? '/profile' : '/auth'}>
              <Avatar fallback="U" radius="full" size="2" src={user?.photoUrl} />
            </NextLink>
          </Link>
        </Flex>
      </Flex>
      {/* <AnimatePresence mode="wait">{showMobileNav ? <MobileNavbar onClick={toggleNav} /> : null}</AnimatePresence> */}
    </div>
  );
}

export { Navbar };
