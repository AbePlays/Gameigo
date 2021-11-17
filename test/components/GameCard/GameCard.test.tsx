import { render, screen } from '@testing-library/react';

import GameCard from '@components/GameCard';

const game = {
  released: '2021-11-08',
  slug: 'forza-horizon-5',
  id: 622492,
  background_image:
    'https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg',
  genres: [
    {
      name: 'Action',
      image_background:
        'https://media.rawg.io/media/games/16b/16b1b7b36e2042d1128d5a3e852b3b2f.jpg',
      games_count: 133079,
      slug: 'action',
      id: 4,
    },
    {
      slug: 'adventure',
      id: 3,
      games_count: 98549,
      name: 'Adventure',
      image_background:
        'https://media.rawg.io/media/games/63f/63f0e68688cad279ed38cde931dbfcdb.jpg',
    },
    {
      id: 14,
      image_background:
        'https://media.rawg.io/media/games/e40/e40cc9d1957b0a0ed7e389834457b524.jpg',
      games_count: 51343,
      name: 'Simulation',
      slug: 'simulation',
    },
    {
      id: 15,
      slug: 'sports',
      image_background:
        'https://media.rawg.io/media/games/9e5/9e52a797f049e701d4eee84774a99007.jpg',
      games_count: 17886,
      name: 'Sports',
    },
    {
      id: 1,
      image_background:
        'https://media.rawg.io/media/games/367/367463d43c2a1465f27e830b5b1334ee.jpg',
      name: 'Racing',
      games_count: 19959,
      slug: 'racing',
    },
  ],
  name: 'Forza Horizon 5',
  parent_platforms: [
    {
      platform: {
        id: 1,
        slug: 'pc',
        name: 'PC',
      },
    },
    {
      platform: {
        id: 3,
        slug: 'xbox',
        name: 'Xbox',
      },
    },
  ],
};

describe('Testing GameCard Component', () => {
  it('should check anchor element', () => {
    render(<GameCard game={game} />);
    const linkEl = screen.getByRole('link');
    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveTextContent(/forza/i);
    expect(linkEl).toHaveAttribute('href', '/game/forza-horizon-5');
  });

  it('should check text content inside the card', () => {
    render(<GameCard game={game} />);
    const textEl = screen.getByRole('heading');
    expect(textEl).toBeInTheDocument();
    expect(textEl).toHaveTextContent(/forza horizon 5/i);
  });
});
