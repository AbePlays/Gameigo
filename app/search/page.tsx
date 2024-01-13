import { Container, Heading, Text } from '@radix-ui/themes';
import { Metadata } from 'next';
import { Suspense } from 'react';

import BlurImage from '@components/BlurImage';
import SearchResult from '@components/SearchResult';
import heroBg from 'public/images/search_hero.jpeg';
import { Input } from './input';
import { Loading } from './skeleton';

export const metadata: Metadata = {
  title: 'Gameigo | Search',
  description:
    'Gameigo is a free and open source application backed by a huge database of video games provided by ROG. Explore and search for games and everything you need in one place.',
};

export default function SearchPage({ searchParams }: { searchParams: Record<string, string> }) {
  const { page = '', query = '' } = searchParams;

  return (
    <div className="relative">
      {/* Background Image */}
      <div className="overflow-hidden relative h-[200px] sm:h-[300px]">
        <BlurImage alt="" fill style={{ objectPosition: 'top' }} showBg src={heroBg} />
      </div>

      {/* Intro Text */}
      <div className="light-text text-white text-center px-4 absolute w-full left-0 top-8 sm:top-16">
        <Heading as="h1" size="8">
          Search Gameigo
        </Heading>
        <Text as="p" className="!mt-1 !sm:mt-4 font-medium sm:text-lg">
          Choose from 30,000+ games with new addition every few weeks.
        </Text>
      </div>

      {/* Search Input */}
      <Container className="-translate-y-5 px-4 mx-auto" size="2">
        <Input />
      </Container>

      {/* Search Results */}
      {query ? (
        <Container mt="6">
          <Suspense fallback={<Loading />} key={query + page}>
            <SearchResult page={Number(page || 1)} query={query} />
          </Suspense>
        </Container>
      ) : null}
    </div>
  );
}
