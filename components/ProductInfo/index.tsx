import { Box, Heading, Stack, Text, useColorMode } from '@chakra-ui/react';
import { StaticImageData } from 'next/image';
import { FunctionComponent } from 'react';

import BlurImage from '@components/BlurImage';

interface Props {
  content: string;
  src: StaticImageData;
  title: string;
}

const ProductInfo: FunctionComponent<Props> = ({ content, src, title }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Stack maxWidth="container.sm" mx="auto" my="14" spacing="8">
      <BlurImage alt="" src={src} height="300" width="500" style={{ margin: '0 auto' }} />
      <Box>
        <Heading as="h3" fontSize="2xl">
          {title}
        </Heading>
        <Text
          color={isDarkMode ? 'light-text' : 'dark-text'}
          fontSize="lg"
          fontWeight="medium"
          lineHeight="tall"
          opacity="0.7"
          style={{ textAlignLast: 'center' }}
          textAlign="justify"
        >
          {content}
        </Text>
      </Box>
    </Stack>
  );
};

export default ProductInfo;
