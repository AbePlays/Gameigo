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
    <Stack maxWidth="container.sm" mx="auto" my="14" spacing="16">
      <Box maxW="500px" mx="auto">
        <BlurImage alt="" src={src} height="300" width="500" />
      </Box>
      <Box>
        <Heading as="h3" fontSize="2xl">
          {title}
        </Heading>
        <Text
          color={isDarkMode ? 'light-text' : 'dark-text'}
          fontSize="md"
          lineHeight="tall"
          mt="4"
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
