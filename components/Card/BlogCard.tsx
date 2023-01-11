/*
This file consists of "BlogCard" component which is used to display a blog card 
*/

import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { customLoader } from "../../helpers/customImageLoader";

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
  likes: Array<string>;
  createdAt: string;
  anonymous: boolean;
};
interface Props {
  blog: BlogProps;
}

export const BlogCard = ({ blog }: Props) => {
  const { authData } = useSelector((state: RootState) => state.user);

  let dateToDisplay: string = "";

  if (dayjs().diff(dayjs(blog.createdAt), "day") < 10) {
    dayjs.extend(relativeTime);
    dateToDisplay = dayjs(blog.createdAt).fromNow();
  } else {
    dateToDisplay = dayjs(blog.createdAt).format("DD MMM YYYY");
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 max-w-[300px] lg:w-[300px] shadow-lg">
      {/* Design and display a blog card */}
      <div className="relative flex flex-col min-h-[380px] rounded-t-lg overflow-hidden w-full">
        {/* Card Image */}
        <div className="relative w-full h-[180px] bg-gray-300">
          <Image
            src={
              blog.featuredImage ? blog.featuredImage : "/static/about/1.jpg"
            }
            loader={customLoader}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            // ? Don't know whether it is a good idea to use blurDataURL same as src or not
            // placeholder="blur"
            // blurDataURL={blog.featuredImage}
            className="w-full h-full object-cover rounded-t-lg"
          />
          {/* <img
            src={
              blog.featuredImage ? blog.featuredImage : "/static/about/1.jpg"
            }
            alt={blog.title}
            className="w-full h-full object-cover rounded-t-lg"
          /> */}
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
            <h1 className="line-clamp-2 my-[0.1rem] leading-5 font-semibold cursor-pointer hover:text-blue-500 transition-colors duration-300 ease-in-out">
              {blog.title}
            </h1>
          </Link>

          {/* Card Description */}
          <p className="line-clamp-3 text-[0.825rem] ">{blog.description}</p>
          {/* Card author */}
          <div className="absolute bottom-2 flex items-center  gap-2">
            {/* Rounded author image */}
            <div className="relative h-7 w-7 rounded-full bg-gray-300">
              <Image
                src={blog.anonymous ? "/static/about/1.jpg" : blog.user.photo ? blog.user.photo : "/static/about/1.jpg"}
                alt={blog.anonymous ? "Anonymous" : blog.user.name}
                layout="fill"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              {/* Author name */}

              <h1 className="text-sm font-semibold">
                {blog.anonymous ? "Anonymous" : blog.user.name}
              </h1>
              <p className="text-xs">{dateToDisplay}</p>
            </div>
          </div>
          {/* Likes */}
          {blog.likes && blog.likes.length > 0 && (
            <Tooltip
              title={`${blog.likes.length} ${
                blog.likes.length > 1 ? "people" : "person"
              } found this helpful`}
            >
              <div className="cursor-pointer absolute bottom-2 right-2 flex items-center gap-1">
                <i
                  className={`fa-sharp text-lg fa-solid fa-heart ${
                    blog.likes.includes(authData?._id)
                      ? "text-red-900"
                      : "text-red-500"
                  }`}
                ></i>
                <p className="text-sm">
                  {(new Intl.NumberFormat().format(blog.likes.length) as any) +
                    " "}
                </p>
              </div>
            </Tooltip>
          )}
        </div>
      </div>
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
// Todo: Design sophisticated BlogCard UI
