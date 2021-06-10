import Home from '../../pages/index';
import { Routes } from '../../routes';
import { render, screen, fireEvent } from '../test-utils';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: mockPush,
  })),
}));

describe('Testing Home Component', () => {
  it('should check for hero-image', () => {
    render(<Home />);
    expect(
      screen.getByRole('img', { name: /man playing on his laptop/i })
    ).toBeInTheDocument();
  });

  it('should check CTA', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: /get started/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalledWith(Routes.AUTH_SCREEN);
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
