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
  it('should check CTA', async () => {
    render(<Home />);
    const buttonEls = await screen.findAllByRole('button', {
      name: /get started/i,
    });
    expect(buttonEls.length).toBe(2);

    fireEvent.click(buttonEls[0]);
    expect(mockPush).toHaveBeenCalledWith(Routes.AUTH_SCREEN);
    expect(mockPush).toHaveBeenCalledTimes(1);
  });
});
