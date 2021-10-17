export type User = {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
};

export type AuthContextType = {
  user: User;
  loading: boolean;
  changeDisplayName: (name: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  signupWithEmailAndPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  signinWithGoogle: () => Promise<void>;
  signinWithGithub: () => Promise<void>;
  signout: () => Promise<void>;
};
