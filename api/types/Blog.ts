export interface Blog {
  _id: string;
  title: string;
  description: string;
  featuredImage: string;
  slug: string;
  tags: string[];
  branch: {
    value: string;
    label: string;
  };
  semester: {
    value: string;
    label: string;
  };
  subject: {
    value: string;
    label: string;
  };
  content: string;
  user: {
    name: string;
    photo: string;
  };
  likes: Array<string>;
  createdAt: string;
  anonymous: boolean;
}
