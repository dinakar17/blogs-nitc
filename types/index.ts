export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type SignInFormData = {
  email: string;
  password: string;
};

export type BlogPost = {
  title: string;
  description: string;
  featuredImage: string;
  branch: string;
  tags: string[];
  content: string | undefined;
};
