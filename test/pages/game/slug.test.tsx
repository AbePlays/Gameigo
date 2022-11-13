import GameDetailContainer, { getStaticPaths, getStaticProps } from 'pages/game/[slug]';
import { mockGame, mockGameInfo, mockScreenshots } from '../../mockData';
import { render, screen } from '../../test-utils';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    beforePopState: jest.fn(),
  })),
}));

describe('Testing Game Details Page', () => {
  it('should check game title', () => {
    render(<GameDetailContainer data={{ game: mockGameInfo, screenshots: mockScreenshots }} />);

    expect(screen.getByText(mockGameInfo.name)).toBeInTheDocument();
  });

  it('should check getStaticProps', async () => {
    const response = await getStaticProps({
      params: { slug: 'forza-horizon-5' },
    });
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          data: {
            game: mockGameInfo,
            screenshots: mockScreenshots,
          },
        },
      })
    );
  });

  it('should check getStaticPaths', async () => {
    const response = await getStaticPaths(null);
    expect(response).toEqual(
      expect.objectContaining({
        paths: [{ params: { slug: mockGame.slug } }],
        fallback: 'blocking',
      })
    );
  });
});
