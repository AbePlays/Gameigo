import LoadingCard from '@components/LoadingCard';
import { render, screen } from '../../test-utils';

describe('Testing LoadingCard Component', () => {
  it('should check count prop', () => {
    render(<LoadingCard count={3} />);
    expect(screen.getAllByTestId('loading-card').length).toBe(3);
  });
});
