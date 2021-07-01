import { FunctionComponent } from 'react';
import { useColorMode, Input as ChakraInput } from '@chakra-ui/react';

interface Props {
  placeholder?: string;
  [x: string]: unknown;
}

const Input: FunctionComponent<Props> = ({ placeholder, ...props }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <ChakraInput
      {...props}
      bg={isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'}
      borderColor={isDarkMode ? 'light-text' : 'dark-text'}
      focusBorderColor={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
      placeholder={placeholder}
      _hover={{
        borderColor: `${isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}`,
      }}
    />
  );
};

export default Input;
