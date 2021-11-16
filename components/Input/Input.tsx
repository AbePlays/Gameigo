import {
  forwardRef,
  useColorMode,
  Input as ChakraInput,
  InputProps,
} from '@chakra-ui/react';

interface Props {
  placeholder?: string;
  [x: string]: unknown;
}

const Input = forwardRef<InputProps & Props, 'input'>(
  ({ placeholder, ...props }, ref) => {
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
        _placeholder={{ color: 'gray.400' }}
        ref={ref}
      />
    );
  }
);

export default Input;
