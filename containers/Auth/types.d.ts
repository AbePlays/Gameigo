export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export type SocialAuthProvider = {
  id: number;
  imgSrc: string;
  title: string;
  providerId: string;
};
