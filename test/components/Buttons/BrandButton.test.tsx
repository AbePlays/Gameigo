import { BrandButton } from '@components/Buttons';
import { fireEvent, render, screen } from '../../test-utils';

const title = 'title';
const mockOnClick = jest.fn();
const renderButton = () => {
  return render(
    <BrandButton icon={<br />} title={title} onClick={mockOnClick} />
  );
};

describe('Testing BrandButton Component', () => {
  it('should check title and onClick event on the button', () => {
    renderButton();
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent(title);

    fireEvent.click(buttonEl);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
