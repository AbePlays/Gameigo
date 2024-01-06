import { describe, expect, it } from 'vitest';

import { render } from 'test/test-utils';
import AboutPage from '../page';

describe('Testing About Page', () => {
  it('should render about page', () => {
    const { container } = render(<AboutPage />);
    expect(container).toMatchSnapshot();
  });
});
