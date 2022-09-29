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
  branch: {
    value: string;
    label: string;
  }
  semester: {
    value: string;
    label: string;
  };
  subject: {
    value: string;
    label: string;
  },
  tags: string[];
  content: string | undefined;
  draft ?: boolean;
};
