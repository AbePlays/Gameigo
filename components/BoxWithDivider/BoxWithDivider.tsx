import { FunctionComponent } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';

interface Props {
  id: number;
  title: string;
}

const BoxWithDivider: FunctionComponent<Props> = ({ id, title }) => {
  return (
    <Flex alignItems="center">
      {id !== 0 && <Box w="0.5" h="4" mx="2" bg="black" rounded="lg" />}
      <Text>{title}</Text>
    </Flex>
  );
};

export default BoxWithDivider;
