import Link from "next/link";
import React from "react";

export type BlogProps = {
  _id: string;
  title: string;
  description: string;
  featuredImage: string;
  slug: string;
  tags: string[];
  branch: string;
  user: {
    name: string;
    photo: string;
  };
  createdAt: string;
};
interface Props {
  data: BlogProps;
}

const BlogCard = ({ data }: Props) => {
  console.log(data.tags);
  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 w-[300px] shadow-lg">
      {/* Design and display a blog card */}
      <div className="flex flex-col h-[350px] w-[300px]  rounded-t-lg ">
        {/* Card Image */}
        <div className="w-full h-[45%]">
          <img
            src={data.featuredImage}
            alt="blog image"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        {/* Card Content */}
        <div className="flex flex-col gap-2 p-3 h-[40%] overflow-hidden">
          {/* Card tags */}
          <div className="flex flex-wrap gap-2 text-xs">
            {data.tags.map((tag) => (
              <div
                key={tag}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-md"
              >
                {tag}
              </div>
            ))}
          </div>
          {/* Card Title */}
          <Link href={`/blog/${data.slug}`}>
            <h1 className="text-xl font-semibold cursor-pointer">{data.title}</h1>
          </Link>
          {/* Card Description */}
          <p className="text-sm">{data.description}</p>
        </div>
        {/* Card author */}
        <div className="flex items-center  gap-2 p-3 h-[15%] overflow-hidden">
          {/* Rounded author image */}
          <div className="h-10 w-10 rounded-full bg-gray-300">
            <img
              src={data.featuredImage}
              alt="author image"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* Author name */}
            <h1 className="text-sm font-semibold">{data.title}</h1>
            {/* Published Date */}
            <p className="text-xs">{new Date(data.createdAt).toDateString()}</p>
          </div>
        </div>
      </div>
      {/* Liked by others */}
      <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 text-sm p-2 border border-gray-300 rounded-b-md w-[300px]">
        <p className="text-gray-500 text-center">
          10 people found this exciting
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
