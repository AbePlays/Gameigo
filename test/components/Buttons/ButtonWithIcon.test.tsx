import { ButtonWithIcon } from '@components/Buttons';
import { mockTitle } from '../../mockData';
import { fireEvent, render, screen } from '../../test-utils';

const mockOnClick = jest.fn();

const renderButton = (icon = null) => {
  return render(
    <ButtonWithIcon icon={icon} title={mockTitle} onClick={mockOnClick} />
  );
};

describe('Testing ButtonWithIcon Component', () => {
  it('should render icon', () => {
    renderButton(<span data-testid="icon">I am an icon</span>);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should check title and onClick event on the button', () => {
    renderButton();
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent(mockTitle);

    fireEvent.click(buttonEl);
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
