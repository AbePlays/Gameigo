import SearchPage from '../../pages/search';
import { mockGame, mockText } from '../mockData';
import { fireEvent, render, screen, waitFor } from '../test-utils';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    beforePopState: jest.fn(),
    query: {},
  })),
}));

describe('Testing Search Page', () => {
  it('should check search input', async () => {
    render(<SearchPage />);
    const searchInput = screen.getByPlaceholderText(/search games/i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: mockText } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getAllByText(mockGame.name).length).toBeGreaterThan(0);
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });
  });

  it('should check pagination', async () => {
    render(<SearchPage />);
    const searchInput = screen.getByPlaceholderText(/search games/i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: mockText } });
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    await waitFor(() => {
      expect(screen.getAllByText(mockGame.name).length).toBeGreaterThan(0);
    });
    const nextBtn = screen.getByRole('button', { name: /next/i });
    expect(nextBtn).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    const prevBtn = screen.getByRole('button', { name: /previous/i });
    expect(prevBtn).toBeInTheDocument();

    fireEvent.click(prevBtn);

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });
});
