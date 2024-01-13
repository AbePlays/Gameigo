import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Flex, Link, Text } from '@radix-ui/themes';
import NextLink from 'next/link';
import { parse } from 'valibot';

import GameCard from '@components/GameCard';
import { GameSearchResult, GameSearchSchema } from 'schemas/game';

export default async function SearchResult(props: { page: number; query: string }) {
  const { page, query } = props;
  let searchResult: GameSearchResult = null;

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}&page=${page}&page_size=12`
    );
    const data = parse(GameSearchSchema, await response.json());
    searchResult = data;
  } catch (e) {
    console.error(JSON.stringify(e));
  }

  // const { colorMode } = useColorMode();
  // const colorMode: string = '';
  // const toast = useToast();

  // const isDarkMode = colorMode === 'dark';

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {searchResult.results.map((game) => (
          <Link asChild key={game.id}>
            <NextLink href={`/game/${game.slug}`}>
              <GameCard game={game} />
            </NextLink>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Flex align="center" justify="center" mt="8" gap="8">
        <Link asChild className="flex gap-2 items-center">
          <NextLink
            aria-disabled={searchResult.previous ? undefined : 'true'}
            className={searchResult.previous ? '' : 'pointer-events-none'}
            href={searchResult.previous ? `/search?query=${query}&page=${page - 1}` : '#'}
            tabIndex={searchResult.previous ? 0 : -1}
          >
            <ChevronLeftIcon /> Previous
          </NextLink>
        </Link>

        <Text>{page}</Text>

        <Link asChild className="flex gap-2 items-center">
          <NextLink
            aria-disabled={searchResult.next ? undefined : 'true'}
            className={searchResult.next ? '' : 'pointer-events-none'}
            href={searchResult.next ? `/search?query=${query}&page=${page + 1}` : '#'}
            tabIndex={searchResult.next ? 0 : -1}
          >
            Next <ChevronRightIcon />
          </NextLink>
        </Link>
      </Flex>
    </>
  );
}
