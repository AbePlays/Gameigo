import { Form, Formik } from 'formik';
import { Button } from '@chakra-ui/button';

import { CustomInput } from '@/components/Input';
import { render, screen, fireEvent, waitFor } from '../../test-utils';

const placeholder = 'placeholder';
const type = 'text';
const mockValidate = jest.fn();
const mockOnSubmit = jest.fn();

const renderForm = () => {
  return render(
    <Formik initialValues={{ email: '' }} onSubmit={mockOnSubmit}>
      <Form>
        <CustomInput
          name="email"
          placeholder={placeholder}
          type={type}
          validate={mockValidate}
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
});
