import Home from '../../pages/index';
import { Routes } from '../../routes';
import { fireEvent, mockValue, mockUser, render, screen } from '../test-utils';

const mockPush = jest.fn();
const mockReplace = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPush,
    replace: mockReplace,
  })),
}));

describe('Testing Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should check CTA', async () => {
    render(<Home />);
    const buttonEls = await screen.findAllByRole('button', {
      name: /get started/i,
    });
    expect(buttonEls.length).toBe(2);

    fireEvent.click(buttonEls[0]);
    expect(mockPush).toHaveBeenCalledWith(Routes.HOME_SCREEN);
    expect(mockPush).toHaveBeenCalledTimes(1);
  });

  it('should show loader while loading data in context', () => {
    render(<Home />, { value: { ...mockValue, loaded: false } });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect to home route if user is logged in', () => {
    render(<Home />, { value: { ...mockValue, user: mockUser } });
    expect(mockReplace).toHaveBeenCalled();
    expect(mockReplace).toHaveBeenCalledTimes(1);
    expect(mockReplace).toHaveBeenCalledWith(Routes.HOME_SCREEN);
  });
});
