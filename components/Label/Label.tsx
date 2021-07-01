import { FunctionComponent } from 'react';
import { useColorMode, Box, Text } from '@chakra-ui/react';

interface Props {
  title: string;
}

const Label: FunctionComponent<Props> = ({ title }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  return (
    <Box
      bg={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
      color={isDarkMode ? 'dark-text' : 'light-text'}
      mt="2"
      mr="2"
      px="2"
      py="1"
      rounded="md"
    >
      <Text>{title}</Text>
    </Box>
  );
};

export default Label;
