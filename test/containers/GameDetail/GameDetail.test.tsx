import GameDetail from '@containers/GameDetail';
import { addGame, checkGame, deleteGame } from '@lib/db';
import { mockGameInfo, mockScreenshots } from '../../mockData';
import {
  fireEvent,
  mockUser,
  mockValue,
  render,
  screen,
  waitFor,
} from '../../test-utils';

const mockBack = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    back: mockBack,
  })),
}));

jest.mock('@lib/db', () => ({
  addGame: jest.fn(),
  checkGame: jest.fn().mockResolvedValue(() => false),
  deleteGame: jest.fn(),
}));

const originalClipboard = global.navigator.clipboard;
const mockCopyToClipboard = jest.fn();

describe('Testing GameDetail Container', () => {
  beforeAll(() => {
    Object.assign(navigator, { clipboard: { writeText: mockCopyToClipboard } });
  });

  afterAll(() => {
    Object.assign(navigator, { clipboard: originalClipboard });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should check game title', () => {
    render(<GameDetail game={mockGameInfo} screenshots={mockScreenshots} />);
    const title = screen.getByText(/Deathloop/i, { selector: 'h1' });
    expect(title).toBeInTheDocument();
  });

  it('should check back button', () => {
    render(<GameDetail game={mockGameInfo} screenshots={mockScreenshots} />);
    const buttonEl = screen.getByRole('button', { name: /back/i });
    expect(buttonEl).toBeInTheDocument();

    fireEvent.click(buttonEl);
    expect(mockBack).toHaveBeenCalled();
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('should test copy to clipboard function', () => {
    render(<GameDetail game={mockGameInfo} screenshots={mockScreenshots} />);
    const shareBtn = screen.getByRole('button', { name: /share/i });
    expect(shareBtn).toBeInTheDocument();

    fireEvent.click(shareBtn);
    expect(mockCopyToClipboard).toHaveBeenCalled();
    expect(mockCopyToClipboard).toHaveBeenCalledTimes(1);
  });

  it('should call checkGame fn if user is logged in', async () => {
    render(<GameDetail game={mockGameInfo} screenshots={mockScreenshots} />, {
      value: { ...mockValue, user: mockUser },
    });

    await waitFor(() => {
      expect(checkGame).toHaveBeenCalled();
      expect(checkGame).toHaveBeenCalledTimes(1);
    });
  });

  it('should show favorite button if user is logged in', () => {
    render(<GameDetail game={mockGameInfo} screenshots={mockScreenshots} />, {
      value: { ...mockValue, user: mockUser },
    });

    expect(
      screen.getByRole('button', { name: /favorite/i })
    ).toBeInTheDocument();
  });

  it('should call addGame fn if game is not in the collection', async () => {
    render(<GameDetail game={mockGameInfo} screenshots={mockScreenshots} />, {
      value: { ...mockValue, user: mockUser },
    });

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteBtn).toBeInTheDocument();

    fireEvent.click(favoriteBtn);
    await waitFor(() => {
      expect(addGame).toHaveBeenCalled();
      expect(addGame).toHaveBeenCalledTimes(1);
    });
  });

  it('should call deleteGame fn if game is in the collection', async () => {
    render(<GameDetail game={mockGameInfo} screenshots={mockScreenshots} />, {
      value: { ...mockValue, user: mockUser },
    });

    const favoriteBtn = screen.getByRole('button', { name: /favorite/i });
    expect(favoriteBtn).toBeInTheDocument();

    fireEvent.click(favoriteBtn);
    await waitFor(() => {
      expect(addGame).toHaveBeenCalled();
      expect(addGame).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(favoriteBtn);
    await waitFor(() => {
      expect(deleteGame).toHaveBeenCalled();
      expect(deleteGame).toHaveBeenCalledTimes(1);
    });
  });
});
