import BoxWithDivider from '@components/BoxWithDivider';
import { describe, expect, it } from 'vitest';

import { mockTitle } from '../../mockData';
import { render, screen } from '../../test-utils';

const renderBox = (id = 0) => {
  return render(<BoxWithDivider id={id} title={mockTitle} />);
};

describe('Testing BoxWithDivider Component', () => {
  it('should not display divider for an element with id zero', () => {
    renderBox();
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('should display divider if id is not zero', () => {
    renderBox(1);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
