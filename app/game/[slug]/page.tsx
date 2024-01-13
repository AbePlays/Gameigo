import { ArrowLeftIcon, Share1Icon } from '@radix-ui/react-icons';
import { Button, Container, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { parse } from 'valibot';

import BlurImage from '@components/BlurImage';
import { GameDetail, GameDetailSchema, GameScreenshot, GameScreenshotSchema } from 'schemas/game';

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

  return (
    <Container>
      <Flex align="center" justify="between">
        <Button aria-label="Back" title="Back">
          <ArrowLeftIcon />
        </Button>
        <Button aria-label="Share" title="Share">
          <Share1Icon />
        </Button>
      </Flex>

      <div className="mt-16 text-center">
        <Text weight="medium">
          Day of Release -{' '}
          {gameDetails.released ? <time dateTime={gameDetails.released}>{gameDetails.released}</time> : 'TBA'}
        </Text>
        <Heading mt="8" size="9">
          {gameDetails.name}
        </Heading>
      </div>

      <div className="mt-8 p-8 rounded-2xl">
        <div className="relative rounded-xl overflow-hidden w-full aspect-video">
          <BlurImage fill showBg src={gameDetails.background_image} alt="game background" />
        </div>
      </div>

      <div className="md:flex py-4 text-center">
        <div className="w-full">
          <Heading as="h2">Platforms</Heading>
          {gameDetails.parent_platforms.map((item) => (
            <Text key={item.platform.id}>{item.platform.name}</Text>
          ))}
        </div>
        <div className="w-full">
          <Heading as="h2">Metacritic Score</Heading>
          <Text mt="2">{gameDetails.metacritic || '-'}</Text>
        </div>
        <div className="w-full">
          <Heading as="h2">Genres</Heading>

          {gameDetails.genres.map((item) => (
            <Text key={item.id}>{item.name}</Text>
          ))}
        </div>
      </div>

      {gameDetails.description && (
        <>
          <Heading as="h2">About</Heading>
          <div dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
        </>
      )}

      {gameDetails.publishers.length > 0 && (
        <>
          <Heading as="h2">Publishers</Heading>
          {gameDetails.publishers.map((item) => (
            <Text key={item.id}>{item.name}</Text>
          ))}
        </>
      )}

      {gameDetails.website && (
        <>
          <Heading as="h2">Website</Heading>
          <Link href={gameDetails.website} target="_blank" rel="noreferrer">
            {gameDetails.name}
          </Link>
        </>
      )}

      {gameDetails.stores.length > 0 && (
        <>
          <Heading as="h2">Where to buy</Heading>
          {gameDetails.stores.map((item) => (
            <Text key={item.store.id}>{item.store.name}</Text>
          ))}
        </>
      )}

      {gameScreenshots.length > 0 && (
        <>
          <Heading as="h2">Screenshots</Heading>
          <ul className="flex gap-4">
            {gameScreenshots.map((item) => {
              return (
                <li className="relative rounded-xl overflow-hidden w-full aspect-video" key={item.id}>
                  <BlurImage alt={`game-screenshot-${item.id}`} fill showBg src={item.image} />
                </li>
              );
            })}
          </ul>
          <ul></ul>
        </>
      )}
    </Container>
  );
}
