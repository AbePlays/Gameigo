import { render, screen } from '@testing-library/react';

import NoData from '@components/NoData';

const testTitle = 'TEST_TITLE';

describe('Testing NoData Component', () => {
  it('should check static content', () => {
    render(<NoData title={testTitle} />);
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });

  it('should check if props are passed to the component', () => {
    const { container } = render(<NoData title={testTitle} hello="world" />);
    expect(container.firstChild).toHaveAttribute('hello', 'world');
  });
});
