import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Flex, Link, Text } from '@radix-ui/themes'
import NextLink from 'next/link'
import { parse } from 'valibot'

import GameCard from '@components/GameCard'
import { NoData } from '@components/NoData'
import { GameSearchResult, GameSearchSchema } from 'schemas/game'

export default async function SearchResult(props: { page: number; query: string }) {
  const { page, query } = props
  let searchResult: GameSearchResult | null = null

  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}&page=${page}&page_size=12`
    )
    const data = parse(GameSearchSchema, await response.json())
    searchResult = data
  } catch (e) {
    console.error(JSON.stringify(e))
  }

  if (!searchResult || !searchResult.results.length) {
    return (
      <NoData>
        <Text align="center" as="p" mt="4">
          No games found for &quot;{query}&quot;
        </Text>
      </NoData>
    )
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        {searchResult.results.map((game) => (
          <Link asChild className="!text-[--gray-12]" key={game.id} underline="none">
            <NextLink href={`/game/${game.slug}`}>
              <GameCard game={game} />
            </NextLink>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Flex align="center" justify="center" mt="6" gap="8">
        <Link asChild className="!text-[--gray-12]" underline="none">
          <NextLink
            aria-disabled={searchResult.previous ? undefined : 'true'}
            className={`!flex !gap-2 !items-center ${searchResult.previous ? '' : '!pointer-events-none !opacity-50'}`}
            href={searchResult.previous ? `/search?query=${query}&page=${page - 1}` : '#'}
            tabIndex={searchResult.previous ? 0 : -1}
          >
            <ChevronLeftIcon /> Previous
          </NextLink>
        </Link>

        <Text>{page}</Text>

        <Link asChild className="!text-[--gray-12]" underline="none">
          <NextLink
            aria-disabled={searchResult.next ? undefined : 'true'}
            className={`!flex !gap-2 !items-center ${searchResult.next ? '' : '!pointer-events-none !opacity-50'}`}
            href={searchResult.next ? `/search?query=${query}&page=${page + 1}` : '#'}
            tabIndex={searchResult.next ? 0 : -1}
          >
            Next <ChevronRightIcon />
          </NextLink>
        </Link>
      </Flex>
    </>
  )
}
