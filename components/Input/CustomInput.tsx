import { FormControl, FormErrorMessage, Input, useColorMode, VisuallyHidden } from '@chakra-ui/react';
import { Field } from 'formik';
import { FunctionComponent } from 'react';

interface CustomInputProps {
  name: string;
  placeholder: string;
  type: string;
  validate: (val: string) => string;
}

const CustomInput: FunctionComponent<CustomInputProps> = ({ name, placeholder, type, validate }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <Field name={name} validate={validate}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <VisuallyHidden as="label" htmlFor={name}>
            {name}
          </VisuallyHidden>
          <Input
            {...field}
            bg={isDarkMode ? 'dark-bg-secondary' : 'light-bg-secondary'}
            borderColor={isDarkMode ? 'light-text' : 'dark-text'}
            focusBorderColor={isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}
            fontWeight="medium"
            h="12"
            id={name}
            placeholder={placeholder}
            type={type}
            _hover={{
              borderColor: `${isDarkMode ? 'light-bg-primary' : 'dark-bg-primary'}`,
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
