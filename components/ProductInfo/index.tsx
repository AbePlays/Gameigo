import { FunctionComponent } from 'react';
import { StaticImageData } from 'next/image';
import { useColorMode, Box, Heading, Stack, Text } from '@chakra-ui/react';

import BlurImage from '@components/BlurImage';

interface Props {
  children?: React.ReactNode;
  content: string;
  src: StaticImageData;
  title: string;
}

const ProductInfo: FunctionComponent<Props> = ({ content, src, title }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Stack maxWidth="container.sm" mx="auto" my="14" spacing="16" align="center">
      <Box maxW="500px">
        <BlurImage alt="" src={src} height="300" width="500" />
      </Box>
      <Box>
        <Heading as="h3" fontSize="2xl">
          {title}
        </Heading>
        <Text color={isDarkMode ? 'light-text' : 'dark-text'} fontSize="md" lineHeight="tall" mt="4" opacity="0.7">
          {content}
        </Text>
      </Box>
    </Stack>
  );
};

export default ProductInfo;
