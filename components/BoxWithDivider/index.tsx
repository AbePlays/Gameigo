import { FunctionComponent } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

interface Props {
  id: number;
  title: string;
}

const BoxWithDivider: FunctionComponent<Props> = ({ id, title }) => {
  return (
    <Flex alignItems="center">
      {id !== 0 && <Box bg="white" h="4" w="0.5" mx="2" role="separator" rounded="lg" />}
      <Text as="span">{title}</Text>
    </Flex>
  );
};

export default BoxWithDivider;
