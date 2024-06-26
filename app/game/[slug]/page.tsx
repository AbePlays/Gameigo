import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Box, Button, Container, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { parse } from 'valibot';

import BlurImage from '@components/BlurImage';
import { createClient } from '@libs/supabase/server';
import { formatDate } from '@utils/date';
import { GameDetail, GameDetailSchema, GameScreenshot, GameScreenshotSchema } from 'schemas/game';
import Favorite from './favorite';
import { Share } from './share';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  try {
    const res = await fetch(`https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);
    const data = await res.json();
    console.log(data);
    const { name, description_raw } = parse(GameDetailSchema, data);

    return {
      title: `Gameigo | ${name}`,
      description: description_raw,
    };
  } catch (e) {
    console.error(JSON.stringify(e));
    return;
  }
}

export default async function GameDetailPage({ params }: { params: Record<string, string> }) {
  const { slug } = params;
  let gameDetails: GameDetail = null;
  let gameScreenshots: GameScreenshot['results'] = [];

  try {
    const detailsPromise = fetch(`https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((res) => parse(GameDetailSchema, res));

    const screenshotsPromise = fetch(
      `https://api.rawg.io/api/games/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => parse(GameScreenshotSchema, res));

    const [details, screenshots] = await Promise.all([detailsPromise, screenshotsPromise]);
    gameDetails = details;
    gameScreenshots = screenshots.results;
  } catch (e) {
    console.error(JSON.stringify(e));
  }

  if (!gameDetails) {
    notFound();
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  let isFavorite = false;

  if (data.user) {
    const { data: dbData } = await supabase.from('user_data').select('favorites').eq('user_id', data.user.id).single();

    if (dbData) {
      isFavorite = dbData.favorites.includes(gameDetails.id);
    }
  }

  return (
    <Container p={{ initial: '4', sm: '8' }}>
      <Flex gap="4" justify="end">
        {data.user ? <Favorite gameDetails={gameDetails} isFavorite={isFavorite} userId={data.user.id} /> : null}
        <Share />
      </Flex>

      <Box mt="9">
        <Text align="center" className="block" weight="medium">
          Day of Release -{' '}
          {gameDetails.released ? (
            <time dateTime={gameDetails.released}>{formatDate(gameDetails.released)}</time>
          ) : (
            'TBA'
          )}
        </Text>
        <Heading align="center" mt="8" size="9">
          {gameDetails.name}
        </Heading>
      </Box>

      <Box className="rounded-xl aspect-video shadow-lg" mt="6" overflow="hidden" position="relative" width="100%">
        <BlurImage fill showBg src={gameDetails.background_image} alt="game background" />
      </Box>

      <Flex direction={{ initial: 'column', sm: 'row' }} gap="6" my="8">
        <Box width="100%">
          <Heading align="center" as="h2">
            Platforms
          </Heading>

          <Flex className="divide-x-2 divide-[--gray-12]" justify="center" mt="2">
            {gameDetails.parent_platforms.map((item) => (
              <Text align="center" className="block px-2 !leading-none" key={item.platform.id}>
                {item.platform.name}
              </Text>
            ))}
          </Flex>
        </Box>

        <Box className="!hidden !md:block bg-[--gray-12] self-center rounded-full" width="0.75rem" height="2.5rem" />

        <Box width="100%">
          <Heading align="center" as="h2">
            Metacritic Score
          </Heading>
          <Text align="center" className="block" mt="2">
            {gameDetails.metacritic || '-'}
          </Text>
        </Box>

        <Box className="!hidden !md:block bg-[--gray-12] self-center rounded-full" width="0.75rem" height="2.5rem" />

        <Box width="100%">
          <Heading align="center" as="h2">
            Genres
          </Heading>

          <Flex className="divide-x-2 divide-[--gray-12]" justify="center" mt="2">
            {gameDetails.genres.map((item) => (
              <Text align="center" className="block px-2 !leading-none" key={item.id}>
                {item.name}
              </Text>
            ))}
          </Flex>
        </Box>
      </Flex>

      {gameDetails.description && (
        <>
          <Heading as="h2">About</Heading>
          <Box dangerouslySetInnerHTML={{ __html: gameDetails.description }} mt="2" />
        </>
      )}

      {gameDetails.publishers.length > 0 && (
        <>
          <Heading as="h2" mt="4">
            Publishers
          </Heading>

          <Text as="p" mt="2">
            {new Intl.ListFormat('en-US').format(gameDetails.publishers.map((item) => item.name))}
          </Text>
        </>
      )}

      {gameDetails.website && (
        <>
          <Heading as="h2" mt="4">
            Website
          </Heading>
          <Flex align="center" asChild gap="1" mt="2" width="fit-content">
            <Link href={gameDetails.website} target="_blank" rel="noreferrer">
              {gameDetails.name}
              <ArrowTopRightIcon />
            </Link>
          </Flex>
        </>
      )}

      {gameDetails.stores.length > 0 && (
        <>
          <Heading as="h2" mt="4">
            Where to buy
          </Heading>

          <Flex gap="2" mt="2">
            {gameDetails.stores.map((item) => (
              <Button asChild key={item.store.id} variant="soft">
                <Link href={`https://${item.store.domain}`} rel="noreferrer" target="_blank" underline="none">
                  {item.store.name}
                  <ArrowTopRightIcon />
                </Link>
              </Button>
            ))}
          </Flex>
        </>
      )}

      {gameScreenshots.length > 0 && (
        <>
          <Heading as="h2" mt="4">
            Screenshots
          </Heading>

          <Flex gap="4" mt="4">
            {gameScreenshots.map((item) => {
              return (
                <li className="relative rounded overflow-hidden w-full aspect-video" key={item.id}>
                  <BlurImage alt={`game-screenshot-${item.id}`} fill showBg src={item.image} />
                </li>
              );
            })}
          </Flex>
          <ul></ul>
        </>
      )}
    </Container>
  );
}
