import { Box, Grid, Heading, Text } from '@radix-ui/themes'
import { StaticImageData } from 'next/image'

import BlurImage from '@components/BlurImage'

interface Props {
  content: string
  src: StaticImageData
  title: string
}

function ProductInfo({ content, src, title }: Props) {
  return (
    <Grid gap="4" my="9" maxWidth="40rem" mx="auto">
      <Box height="300px" mx="auto" position="relative" width="500px">
        <BlurImage alt="" fill src={src} />
      </Box>
      <Heading as="h3" size="7">
        {title}
      </Heading>
      <Text as="p" size="4">
        {content}
      </Text>
    </Grid>
  )
}

export { ProductInfo }
