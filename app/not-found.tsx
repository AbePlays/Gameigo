import { Button, Container, Grid, Heading, Text } from '@radix-ui/themes'
import Image from 'next/image'
import NextLink from 'next/link'

import error from 'public/images/error.svg'

export default function NotFoundPage() {
  return (
    <Container p={{ initial: '4', sm: '8' }}>
      <Grid gap="4" maxWidth="30rem" mx="auto">
        <Image alt="A pilot watching the sky while sitting in front of his crashed plane" src={error} />
        <Heading>Oh Snap!</Heading>
        <Text>The page you&apos;re looking for was moved, removed, renamed or might have never existed.</Text>
        <Button asChild size="3">
          <NextLink href="/home">Return to Home</NextLink>
        </Button>
      </Grid>
    </Container>
  )
}
