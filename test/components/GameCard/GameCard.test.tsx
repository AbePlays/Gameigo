import GameCard from '@components/GameCard';
import { mockGame } from '../../mockData';
import { render, screen } from '../../test-utils';

describe('Testing GameCard Component', () => {
  it('should check anchor element', () => {
    render(<GameCard game={mockGame} />);
    const linkEl = screen.getByRole('link');
    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveTextContent(mockGame.name);
    expect(linkEl).toHaveAttribute('href', `/game/${mockGame.slug}`);
  });

  it('should check text content inside the card', () => {
    render(<GameCard game={mockGame} />);
    const textEl = screen.getByRole('heading');
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveTextContent(mockGame.name);
  });
});
