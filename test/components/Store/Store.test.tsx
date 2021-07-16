import { render, screen } from '@testing-library/react';

import Store from '@/components/Store';

const testName = 'TEST_NAME';
const testUrl = 'TEST_URL';

describe('Testing Store Component', () => {
  it('should check link', () => {
    render(<Store name={testName} url={testUrl} />);
    const anchorEl = screen.getByRole('link');
    expect(anchorEl).toHaveTextContent(testName);
    expect(anchorEl).toHaveAttribute('href', `https://${testUrl}`);
  });
});
