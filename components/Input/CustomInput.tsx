import { FunctionComponent } from 'react';
import { Field } from 'formik';
import {
  useColorMode,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

interface CustomInputProps {
  autoComplete?: string;
  name: string;
  placeholder: string;
  type: string;
  validate: (val: string) => string;
}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  autoComplete = 'off',
  name,
  placeholder,
  type,
  validate,
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Field name={name} validate={validate}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name} hidden>
            {name[0].toUpperCase() + name.substring(1)}
          </FormLabel>
          <Input
            {...field}
            autoComplete={autoComplete}
            bg={isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'}
            borderColor={isDarkMode ? 'light-text' : 'dark-text'}
            focusBorderColor={
              isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'
            }
            fontWeight="medium"
            h="12"
            id={name}
            placeholder={placeholder}
            type={type}
            _hover={{
              borderColor: `${
                isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'
              }`,
            }}
            _placeholder={{
              color: 'gray.400',
            }}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomInput;
