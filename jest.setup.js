import '@testing-library/jest-dom/extend-expect';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(),
  };
});
