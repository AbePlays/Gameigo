import { render, screen } from '@testing-library/react';

import AboutCard from '@components/AboutCard';

describe('Testing AboutCard Component', () => {
  it('should check heading', () => {
    render(<AboutCard heading="Hello" />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it('should check children element', () => {
    render(
      <AboutCard heading="World">
        <a href="#">Hello World</a>
      </AboutCard>
    );
    expect(screen.getByRole('link')).toHaveTextContent(/hello world/i);
  });
});
