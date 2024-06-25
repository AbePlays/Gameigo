// import { afterEach, describe, expect, it, vi } from 'vitest';

// import ProfilePage from '../../pages/profile';
// import { mockPassword, mockTitle } from '../mockData';
// import { fireEvent, mockUser, mockValue, render, screen, waitFor } from '../test-utils';

// const mockPush = vi.fn();
// vi.mock('next/router', () => ({
//   useRouter: vi.fn().mockImplementation(() => ({
//     push: mockPush,
//   })),
// }));

// describe('Testing Profile Page', () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it('should redirect to auth page if user is not logged in', () => {
//     render(<ProfilePage />);
//     expect(mockPush).toHaveBeenCalled();
//     expect(mockPush).toHaveBeenCalledTimes(1);
//     expect(mockPush).toHaveBeenCalledWith('/auth');
//   });

//   it('should render user name if user is logged in', () => {
//     render(<ProfilePage />, { value: { ...mockValue, user: mockUser } });
//     expect(screen.getByText(mockUser.name)).toBeInTheDocument();
//   });

//   it('should check logout button if user is logged in', async () => {
//     render(<ProfilePage />, { value: { ...mockValue, user: mockUser } });
//     const logoutButton = screen.getByRole('button', { name: /log out/i });
//     expect(logoutButton).toBeInTheDocument();

//     fireEvent.click(logoutButton);
//     await waitFor(() => {
//       expect(mockValue.signout).toHaveBeenCalled();
//       expect(mockValue.signout).toHaveBeenCalledTimes(1);
//     });
//   });

//   it('should check form', async () => {
//     render(<ProfilePage />, { value: { ...mockValue, user: mockUser } });
//     const nameInput = screen.getByLabelText(/name/i);
//     expect(nameInput).toBeInTheDocument();
//     const passwordInput = screen.getByLabelText(/password/i);
//     expect(passwordInput).toBeInTheDocument();
//     const submitButton = screen.getByRole('button', { name: /save changes/i });
//     expect(submitButton).toBeInTheDocument();
//     expect(submitButton).toHaveAttribute('type', 'submit');

//     fireEvent.change(nameInput, { target: { value: mockTitle } });
//     fireEvent.change(passwordInput, { target: { value: mockPassword } });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(mockValue.changeDisplayName).toHaveBeenCalled();
//       expect(mockValue.changeDisplayName).toHaveBeenCalledTimes(1);
//       expect(mockValue.changeDisplayName).toHaveBeenCalledWith(mockTitle);

//       expect(mockValue.changePassword).toHaveBeenCalled();
//       expect(mockValue.changePassword).toHaveBeenCalledTimes(1);
//       expect(mockValue.changePassword).toHaveBeenCalledWith(mockPassword);
//     });
//   });
// });
