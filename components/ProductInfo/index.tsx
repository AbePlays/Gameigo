import { FunctionComponent } from 'react';
import Image from 'next/image';
import { useColorMode, Box, Heading, Text } from '@chakra-ui/react';

interface Props {
  alt: string;
  content: string;
  src: StaticImageData;
  title: string;
}

const ProductInfo: FunctionComponent<Props> = ({
  alt = '',
  content,
  src,
  title,
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Box maxWidth="container.sm" mx="auto" my="14" spacing="16" align="center">
      <Box maxW="500px">
        <Image alt={alt} src={src} placeholder="blur" />
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
        >
          {content}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductInfo;
