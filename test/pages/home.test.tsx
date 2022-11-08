import HomePage, { getStaticProps } from 'pages/home';
import { render, screen } from '../test-utils';
import { mockGame } from '../mockData';

describe('Testing Home Page', () => {
  it('should display the correct title', () => {
    render(<HomePage games={[mockGame]} />);
    expect(screen.getByText(/new and trending/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Forza Horizon 5' })).toBeInTheDocument();
  });

  it('should test getStaticProps', async () => {
    const response = await getStaticProps(null);
    expect(response).toEqual(
      expect.objectContaining({
        props: { games: [mockGame] },
      })
    );
  });
});
