import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

interface Props {
  id: number;
  title: string;
}

const BoxWithDivider: FunctionComponent<Props> = ({ id, title }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Flex alignItems="center">
      {id !== 0 && <Box bg={isDarkMode ? 'white' : 'black'} h="4" w="0.5" mx="2" role="separator" rounded="lg" />}
      <Text as="span">{title}</Text>
    </Flex>
  );
};

export default BoxWithDivider;
