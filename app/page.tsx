import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Button, Container, Grid, Heading, Text } from '@radix-ui/themes'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { createClient } from '@libs/supabase/server'
import easy from 'public/images/easy.svg'
import free from 'public/images/free.svg'
import hero from 'public/images/hero.png'
import homeDark from 'public/images/home.jpg'
import vision from 'public/images/vision.svg'
import { ProductInfo } from './product-info'

export const metadata: Metadata = {
  title: 'Gameigo | Welcome',
  description:
    'Gameigo is a video game discovery platform where users can explore and create a personalized collection of video games from around the world.',
  openGraph: {
    title: 'Gameigo | Welcome',
    description:
      'Gameigo is a video game discovery platform where users can explore and create a personalized collection of video games from around the world.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gameigo | Welcome',
    description:
      'Gameigo is a video game discovery platform where users can explore and create a personalized collection of video games from around the world.',
  },
}

export default async function Home() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect('/home')
  }

  return (
    <Container p={{ initial: '4', sm: '8' }}>
      <Grid
        align="center"
        columns={{ initial: '1', sm: '2' }}
        maxWidth="60rem"
        mx="auto"
        height="calc(100vh - 64px - 3rem)"
      >
        <Grid className="text-center md:text-left" gap={{ initial: '6', sm: '8' }} height="max-content">
          <Heading as="h1" className="!leading-[1.15]" size={{ initial: '8', sm: '9' }}>
            The database platform for{' '}
            <Text
              className="text-[--gray-contrast]"
              style={{
                textShadow:
                  '#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px, #000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px',
              }}
            >
              gamers
            </Text>
          </Heading>

          <Text as="p" className="!leading-relaxed" size={{ initial: '5', sm: '6' }}>
            Gameigo provides users a video game discovery platform where they can explore and create a personalized
            collection of video games from around the world.
          </Text>

          <Button asChild className="!w-fit" size="3" mx={{ initial: 'auto', sm: 'none' }}>
            <Link href="/home">
              Get started
              <ChevronRightIcon width="16" height="16" />
            </Link>
          </Button>
        </Grid>

        <Image alt="" className="h-fit mx-auto order-first md:order-last" src={hero} height="400" width="500" />
      </Grid>

      <Heading align="center" as="h2" className="underline" mt="9" size="8">
        Why Choose Gameigo?
      </Heading>

      <Image alt="Gameigo home page" className="shadow-lg rounded mx-auto mt-8" src={homeDark} />

      <ul className="py-8 list-none text-center">
        <li>
          <ProductInfo
            content="Gameigo is a free and open source application backed by a huge database of video games provided by RAWG. It supports features such as searching for games, creating collections, and sharing your collections with friends."
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

      <Grid className="justify-items-center" gap="4">
        <Heading as="h3" size="7">
          Ready to Explore?
        </Heading>
        <Button asChild className="!w-fit" size="3">
          <Link href="/home">
            Get started
            <ChevronRightIcon width="16" height="16" />
          </Link>
        </Button>
      </Grid>
    </Container>
  )
}
