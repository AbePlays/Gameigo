import { Form, Formik } from 'formik';
import { Button } from '@chakra-ui/button';

import { CustomInput } from '@/components/Input';
import { render, screen, fireEvent, waitFor } from '../../test-utils';

const placeholder = 'placeholder';
const type = 'text';
const invalidEmail = 'abc';
const mockValidate = jest.fn();
const mockOnSubmit = jest.fn();

const renderForm = (validate = mockValidate) => {
  return render(
    <Formik initialValues={{ email: '' }} onSubmit={mockOnSubmit}>
      <Form>
        <CustomInput
          name="email"
          placeholder={placeholder}
          type={type}
          validate={validate}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};

describe('Testing CustomInput Component', () => {
  it('should check for form input', async () => {
    renderForm();
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('placeholder', placeholder);
    expect(emailInput).toHaveAttribute('type', type);

    fireEvent.change(emailInput, { target: { value: 'a' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockValidate).toHaveBeenCalledWith('a');
      expect(mockValidate).toHaveBeenCalledTimes(2);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it('should check error text below form input', async () => {
    const validate = jest.fn().mockImplementation(() => {
      return 'Invalid Email';
    });
    renderForm(validate);
    const emailInput = screen.getByLabelText(/email/i);
    const errorEl = screen.queryByTestId('error-div');
    expect(emailInput).toBeInTheDocument();
    expect(errorEl).not.toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: invalidEmail } });
    fireEvent.focusOut(emailInput);
    await waitFor(() =>
      expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
    );
  });
});
