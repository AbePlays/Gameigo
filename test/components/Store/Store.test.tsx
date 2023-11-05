import { describe, expect, it } from 'vitest';

import Store from '@components/Store';
import { mockTitle, mockLink } from 'test/mockData';
import { render, screen } from '../../test-utils';

describe('Testing Store Component', () => {
  it('should check link', () => {
    render(<Store name={mockTitle} url={mockLink} />);
    const anchorEl = screen.getByRole('link');
    expect(anchorEl).toHaveTextContent(mockTitle);
    expect(anchorEl).toHaveAttribute('href', `https://${mockLink}`);
  });
});
