import { Box, Container, Heading, Link, Text } from '@radix-ui/themes';
import NextLink from 'next/link';

import BlurImage from '@components/BlurImage';
import error from 'public/images/error.png';

export default function ErrorPage() {
  return (
    <Container size="3">
      <Box className="text-center" mt="6">
        <BlurImage
          alt="A pilot watching the sky while sitting in front of his crashed plane"
          height="300"
          width="500"
          src={error}
          style={{ marginInline: 'auto' }}
        />
        <Heading mt="6">Oh Snap!</Heading>
        <Text mt="4" mx="auto">
          The page you&apos;re looking for was moved, removed, renamed or might have never existed.
        </Text>
        <Link asChild>
          <NextLink href="/home">Return to Home</NextLink>
        </Link>
      </Box>
    </Container>
  );
}
