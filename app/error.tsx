'use client'

import { Button, Container, Grid, Heading, Text } from '@radix-ui/themes'

import BlurImage from '@components/BlurImage'
import errorImg from 'public/images/error.png'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error)

  return (
    <Container p={{ initial: '4', sm: '8' }}>
      <Grid gap="4" maxWidth="30rem" mx="auto">
        <BlurImage
          alt="A pilot watching the sky while sitting in front of his crashed plane"
          height="300"
          src={errorImg}
          width="500"
        />
        <Heading>Oops, something went wrong</Heading>
        <Text>Don&apos;t worry, we&apos;re fixing this. We will be back for you soon!</Text>
        <Button onClick={reset} size="3">
          Try again
        </Button>
      </Grid>
    </Container>
  )
}
