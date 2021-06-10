import { FunctionComponent } from 'react';
import { Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';

interface CustomInputProps {
  name: string;
  placeholder: string;
  type: string;
  validate: (val: string) => string;
}

const CustomInput: FunctionComponent<CustomInputProps> = ({
  name,
  validate,
  placeholder,
  type,
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }) => (
        <FormControl isInvalid={form.errors[name] && form.touched[name]}>
          <FormLabel htmlFor={name} hidden>
            {name[0].toUpperCase() + name.substring(1)}
          </FormLabel>
          <Input
            {...field}
            id={name}
            h="12"
            type={type}
            fontWeight="medium"
            focusBorderColor="black"
            borderColor="black"
            placeholder={placeholder}
          />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomInput;
