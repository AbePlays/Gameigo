import { describe, expect, it } from 'vitest';

import CustomLink from '@components/CustomLink';
import { mockLink, mockTitle } from '../../mockData';
import { render, screen } from '../../test-utils';

describe('Testing CustomLink Component', () => {
  it('should check anchor element', () => {
    render(<CustomLink link={mockLink} title={mockTitle} />);
    const linkEl = screen.getByRole('link');
    expect(linkEl).toHaveTextContent(mockTitle);
    expect(linkEl).toHaveAttribute('href', mockLink);
  });
});
