import AboutPage from 'pages/about';
import { render, screen } from '../test-utils';

describe('Testing About Page', () => {
  it('should render about page', () => {
    render(<AboutPage />);
    expect(screen).toMatchSnapshot();
  });
});
