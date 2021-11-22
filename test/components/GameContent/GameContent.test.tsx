import GameContent from '@components/GameContent';
import { mockText, mockTitle } from '../../mockData';
import { render, screen } from '../../test-utils';

describe('Testing GameContent Component', () => {
  it('should check if heading is rendered', () => {
    render(<GameContent heading={mockTitle} />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(mockTitle);
  });

  it('should check if children are rendered', () => {
    render(
      <GameContent heading={mockTitle}>
        <p>{mockText}</p>
      </GameContent>
    );

    const paragraph = screen.getByText(mockText);
    expect(paragraph).toBeInTheDocument();
  });
});
