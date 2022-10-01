import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MagnifyingGlassLoader } from "../UI/Loader/Loader";
import NoSearchResults from "../UI/Search/NoSearchResults";

export type BlogProps = {
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
  createdAt: string;
};
interface Props {
  blog: BlogProps;
}

// Todo: change "any" to response type
export const BlogCard = ({ blog }: Props) => {
  // data === res.data || props.data
  // blogdata is the array of posts
  // console.log(blogtags);
  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 max-w-sm lg:w-[300px] shadow-lg">
      {/* Design and display a blog card */}
      <div className="relative flex flex-col min-h-[380px] max-w-sm rounded-t-lg overflow-hidden">
        {/* Card Image */}
        <div className="relative w-full h-[180px] bg-gray-300">
          <Image
            src={blog.featuredImage}
            alt="blog image"
            layout="fill"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        {/* Card Content */}
        <div className="flex flex-col gap-1 p-3 min-h-[190px]">
          {/* Card tags */}
          <div className="flex flex-wrap gap-2 text-xs">
            {/* Display the first two tags */}

            {blog.tags.slice(0, 2).map((tag: string) => (
              <div
                key={tag}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-md"
              >
                {tag}
              </div>
            ))}
          </div>
          {/* Card Title */}

          <Link href={`/blog/${blog.slug}`}>
            <h1 className="line-clamp-2 my-[0.1rem] leading-5 font-semibold cursor-pointer">
              {blog.title}
            </h1>
          </Link>

          {/* Card Description */}
          <p className="line-clamp-3 text-[0.825rem] ">{blog.description}</p>
          {/* Card author */}
          <div className="absolute bottom-2 flex items-center  gap-2">
            {/* Rounded author image */}
            <div className="h-7 w-7 rounded-full bg-gray-300">
              <img
                src={blog.user.photo}
                alt="author image"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* Author name */}

              <h1 className="text-sm font-semibold">{blog.user.name}</h1>
              <p className="text-xs">
                {new Date(blog.createdAt)
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Liked by others */}
      {/* <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 text-sm p-2 border border-gray-300 rounded-b-md w-[300px]">
        <p className="text-gray-500 text-center">
          10 people found this exciting
        </p>
      </div> */}
    </div>
  );
};

// // Todo: change data type any
const BlogCards = ({ data }: any) => {
  // data === res.data
  // console.log("BlogCards ", data);
  return (
    <>
      {data.data.map((blog: BlogProps) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </>
  );
};

export default BlogCards;

// https://stackoverflow.com/questions/72845518/make-text-overflow-visible-on-hover-using-react-css
