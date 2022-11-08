import AboutPage from 'pages/about';
import { render } from '../test-utils';

describe('Testing About Page', () => {
  it('should render about page', () => {
    const { container } = render(<AboutPage />);
    expect(container).toMatchSnapshot();
  });
});
