import { Grid, Heading, Text } from '@radix-ui/themes';
import { StaticImageData } from 'next/image';

import BlurImage from '@components/BlurImage';

interface Props {
  content: string;
  src: StaticImageData;
  title: string;
}

function ProductInfo({ content, src, title }: Props) {
  return (
    <Grid gap="4" my="9" maxWidth="40rem" mx="auto">
      <BlurImage alt="" className="mx-auto" src={src} height="300" width="500" />
      <Heading as="h3" size="7">
        {title}
      </Heading>
      <Text as="p" size="4">
        {content}
      </Text>
    </Grid>
  );
}

export { ProductInfo };
