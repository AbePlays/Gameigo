import { Box, Grid, Heading, Text } from '@radix-ui/themes'
import Image, { StaticImageData } from 'next/image'

interface Props {
  content: string
  src: StaticImageData
  title: string
}

function ProductInfo({ content, src, title }: Props) {
  return (
    <Grid gap="4" my="9" maxWidth="40rem" mx="auto">
      <Box height="300px" mx="auto" position="relative" width="100%">
        <Image alt="" fill src={src} />
      </Box>
      <Heading as="h3" size="7">
        {title}
      </Heading>
      <Text className="text-justify" as="p" size="4" style={{ textAlignLast: 'center' }}>
        {content}
      </Text>
    </Grid>
  )
}

export { ProductInfo }
