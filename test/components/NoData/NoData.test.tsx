import { describe, expect, it } from 'vitest';

import { NoData } from '@components/NoData';
import { mockTitle } from '../../mockData';
import { render, screen } from '../../test-utils';

describe('Testing NoData Component', () => {
  it('should check static content', () => {
    render(<NoData />);
    expect(screen.getByText(/no data found/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('should check if props are passed to the component', () => {
    const { container } = render(<NoData />);
    expect(container.firstChild).toHaveAttribute('hello', 'world');
  });
});
