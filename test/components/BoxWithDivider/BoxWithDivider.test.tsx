import BoxWithDivider from '@components/BoxWithDivider';
import { render, screen } from '../../test-utils';

const renderBox = (id = 0) => {
  return render(<BoxWithDivider id={id} title="Hello" />);
};

describe('Testing BoxWithDivider Component', () => {
  it('should not display divider for an element with id zero', () => {
    renderBox();
    expect(screen.queryByTestId('divider')).not.toBeInTheDocument();
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it('should display divider if id is not zero', () => {
    renderBox(1);
    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });
});
