import AboutCard from '@components/AboutCard';
import { mockHeading, mockTitle } from '../../mockData';
import { render, screen } from '../../test-utils';

describe('Testing AboutCard Component', () => {
  it('should check heading', () => {
    render(<AboutCard heading={mockHeading} />);
    expect(screen.getByText(mockHeading)).toBeInTheDocument();
  });

  it('should check children element', () => {
    render(
      <AboutCard heading={mockHeading}>
        <a href="#">{mockTitle}</a>
      </AboutCard>
    );
    expect(screen.getByRole('link')).toHaveTextContent(mockTitle);
  });
});
