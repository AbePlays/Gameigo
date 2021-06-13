import { FunctionComponent } from 'react';
import { Box, Text } from '@chakra-ui/layout';

interface Props {
  title: string;
}

const Label: FunctionComponent<Props> = ({ title }) => {
  return (
    <Box bg="black" color="white" mt="2" mr="2" px="2" py="1" rounded="md">
      <Text>{title}</Text>
    </Box>
  );
};

export default Label;
