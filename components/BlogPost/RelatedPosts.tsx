import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BlogPostDetails, RelatedBlog } from "../../pages/blog/[slug]";
import { customLoader } from "../../helpers/customImageLoader";

type RelatedPostsProps = {
  data: {
    status: string;
    data: BlogPostDetails;
    relatedBlogs: Array<RelatedBlog>;
  };
};

const RelatedPosts = ({ data }: RelatedPostsProps) => {
  // console.log(data);
  return (
    <div className="block  lg:w-[400px] lg:mt-32 lg:mr-24">
      <div className="lg:shadow-xl p-5 rounded-md w-[90%] mx-auto flex flex-col gap-5">
        <div>
          <h4 className="lg:text-left text-center text-2xl font-extrabold">
            Related Posts
          </h4>
          <hr className="border-4 border-blue-500 cursor-pointer hover:border-blue-500 duration-500" />
        </div>
        <div className="flex flex-col gap-4">
          {data.relatedBlogs.map((blog: RelatedBlog) => (
            <div className="grid grid-cols-2 gap-2" key={blog._id}>
              <div className="relative w-full">
                <Image
                  src={blog.featuredImage}
                  loader={customLoader}
                  layout="fill"
                  objectFit="cover"
                />
                {/* <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" /> */}
              </div>
              <div key={blog._id} className="flex flex-col gap-2">
                <Link href={`/blog/${blog.slug}`}>
                  <h4 className="text-sm font-bold line-clamp-2 cursor-pointer hover:text-blue-500">
                    {blog.title}
                  </h4>
                </Link>
                <div className="flex flex-col">
                  <p className="text-xs text-gray-500">
                    {blog.anonymous ? "Anonymous" : 
                    // @ts-ignore Todo: Fix this issue 
                    blog.user.name ? blog.user.name : blog.user[0].name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(blog.createdAt).toDateString().slice(4)}
                  </p>
                </div>
                <hr className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedPosts;

// Todo: Fix UI of Date and Author
// Todo: Fix related posts UI in tablet view
