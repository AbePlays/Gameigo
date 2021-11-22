import Input from '@components/Input';
import { mockText } from '../../mockData';
import { render, screen } from '../../test-utils';

describe('Testing Input Component', () => {
  it('should render placeholder', () => {
    render(<Input placeholder={mockText} />);
    expect(screen.getByPlaceholderText(mockText)).toBeInTheDocument();
  });

  it('should check if optional props are passed on', () => {
    render(<Input height="30px" placeholder={mockText} />);
    expect(screen.getByPlaceholderText(mockText)).toHaveStyle('height: 30px');
  });
});
