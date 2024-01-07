import { ChevronRightIcon } from '@radix-ui/react-icons';
import { Button, Container, Heading, Text } from '@radix-ui/themes';
import { Metadata } from 'next';

import BlurImage from '@components/BlurImage';
import Loader from '@components/Loader';
import easy from 'public/images/easy.png';
import free from 'public/images/free.png';
import hero from 'public/images/hero.png';
import homeDark from 'public/images/home.png';
import vision from 'public/images/vision.png';
import { ProductInfo } from './product-info';

export const metadata: Metadata = {
  title: 'Gameigo | Welcome',
  description:
    'Gameigo is a video game discovery platform where users can explore and create an exclusive collection of video games from around the world.',
};

export default function Home() {
  // const { loaded, user } = useAuth();
  const loaded = true;
  const user = null;
  // const { colorMode } = useColorMode();
  const colorMode: string = 'light';
  // const router = useRouter();
  const isDarkMode = colorMode === 'dark';

  // const redirectToAuthScreen = () => router.push(Routes.HOME_SCREEN);
  // useEffect(() => {
  //   if (loaded && user) {
  //     router.replace(Routes.HOME_SCREEN);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loaded, user]);
  if (!loaded) return <Loader />;

  if (loaded && user) return null;

  return (
    <Container>
      <div className="grid md:grid-cols-2 items-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="space-y-8">
          <Heading as="h1" size="9">
            The database platform for{' '}
            <Text
              className="text-white"
              style={{
                textShadow:
                  '#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px, #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px',
              }}
            >
              gamers
            </Text>
          </Heading>
          <Text as="p" className={`${isDarkMode ? 'light-text' : 'dark-text'}`} size="6">
            Gameigo provides users a video game discovery platform where they can explore and create an exclusive
            collection of video games from around the world.
          </Text>
          <Button size="3">
            Get started
            <ChevronRightIcon width="16" height="16" />
          </Button>
        </div>
        <BlurImage alt="" className="ml-auto" src={hero} height="400" width="500" />
      </div>

      <Heading align="center" as="h2" className="underline !md:mt-8" size="8">
        Why Choose Gameigo?
      </Heading>

      <BlurImage
        alt="Gameigo home page"
        className="shadow-lg rounded mx-auto mt-8"
        showBg
        src={homeDark}
        height="575"
        width="920"
      />

      <ul className="py-8 list-none text-center">
        <li>
          <ProductInfo
            content="Gameigo is a free and open source application backed by a huge database of video games provided by ROG. It supports features such as searching for games, creating collections, and sharing your collections with friends."
            src={free}
            title="Free to use and open source"
          />
        </li>
        <li>
          <ProductInfo
            content="Gameigo provides a simple user interface and a simple user experience. The UI is designed to be intuitive and easy to use. The UX is designed to be simple and easy to understand. Gameigo makes it easy to discover and share video games."
            src={easy}
            title="Simple UI &amp; UX"
          />
        </li>
        <li>
          <ProductInfo
            content="Stop jumping from game to game, and stop having to search for games. Gameigo provides everything you need in one place. Manage your collections, discover new games, and share your collections with friends."
            src={vision}
            title="Everything in one place"
          />
        </li>
      </ul>

      <div className={`${isDarkMode ? 'dark-bg-secondary' : 'grey'} py-6 text-center space-y-4`}>
        <Heading as="h3" size="7">
          Ready to Explore?
        </Heading>
        <Button size="3">
          Get started
          <ChevronRightIcon width="16" height="16" />
        </Button>
      </div>
    </Container>
  );
}
