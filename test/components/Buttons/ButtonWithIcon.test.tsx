import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonWithIcon } from '@components/Buttons';

const title = 'title';
const mockOnClick = jest.fn();

const renderButton = (icon = null) => {
  return render(
    <ButtonWithIcon icon={icon} title={title} onClick={mockOnClick} />
  );
};

describe('Testing ButtonWithIcon Component', () => {
  it('should check title and onClick event on the button', () => {
    renderButton();
    const buttonEl = screen.getByRole('button');
    expect(buttonEl).toBeInTheDocument();
    expect(buttonEl).toHaveTextContent(title);

    fireEvent.click(buttonEl);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
