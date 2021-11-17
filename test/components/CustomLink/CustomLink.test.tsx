import { render, screen } from '@testing-library/react';

import CustomLink from '@components/CustomLink';

describe('Testing CustomLink Component', () => {
  it('should check anchor element', () => {
    render(<CustomLink link="https://dunder-mifflin.store/" title="Dwight" />);
    const linkEl = screen.getByRole('link');
    expect(linkEl).toHaveTextContent(/dwight/i);
    expect(linkEl).toHaveAttribute('href', 'https://dunder-mifflin.store/');
    expect(linkEl).toHaveAttribute('target', '_blank');
  });
});
