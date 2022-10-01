import {  AxiosRequestConfig } from "axios";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
// dynamic import TwitterHeart

import parse from "html-react-parser";

import * as api from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";

/* 
 _id: '6324bc5aeb64b6ffb21e398b',
    title: "Harry Potter and the Sorcerer's Stone (2001) ",
    user: {
      _id: '632461d1416122fc5212c05b',
      name: 'Dinakar',
      photo: 'http://localhost:5001/uploads/68-686374_doraemon-wallpapers-doraemon-movies-in-telugu.jpg'
    },
    createdAt: '2022-09-16T18:11:38.699Z',
    slug: "dinakar's-blog-2",
    id: '6324bc5aeb64b6ffb21e398b'
*/
type RelatedBlog = {
  _id: string;
  title: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  slug: string;
  id: string;
};

type BlogPostDetails = {
  branch: { value: string; label: string };
  // ? Server is returning semester as string
  semester: { value: string; label: string };
  subject: { value: string; label: string };
  _id: string;
  title: string;
  description: string;
  featuredImage: string;
  tags: string[];
  content: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  likes: Array<{ user: string }>;
  draft: boolean;
  reviewed: boolean;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  id: string; // same as _id
};

type Props = {
  data: {
    status: string;
    data: BlogPostDetails;
    relatedBlogs: Array<RelatedBlog>;
  };
  error: any;
};

const fetcher = (url: string, config: AxiosRequestConfig) =>
  api.likePost(url, config).then((res) => res.data);

const BlogDetail: NextPage<Props> = (props) => {
  const router = useRouter();

  const { data, error } = props;
  const { authData, token } = useSelector((state: RootState) => state.user);

  const [like, setLike] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);

  if (error) {
    toast(error, { type: "error" });
    return null;
  }
  // console.log(data);
  const handleLike = () => {
    // setLike(true);
    setHeartClicked(true);
    console.log("like clicked");
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = useSWR(
    like && token ? [`/api/v1/blogs/like/${data.data._id}`, config] : null,
    fetcher
  );
  if (res.data) {
    console.log(res.data);
  }

  return (
    <>
      <Head>
        <title>{data.data.title}</title>
        <meta name="description" content={data.data.description} />
      </Head>
      {/* https://css-tricks.com/equal-columns-with-flexbox-its-more-complicated-than-you-might-think/ */}
      <div className="grid grid-cols-1 md:grid-flow-col justify-evenly">
        <div className="w-full md:w-[70%] mx-auto p-2 prose max-w-screen-xl prose-indigo md:prose-md prose-img:object-cover prose-img:rounded-lg prose-img:shadow-lg dark:prose-p:text-white">
          <div className="w-[90%] mx-auto text-center">
            <h4 className="text-3xl md:text-5xl font-extrabold">
              {data.data.title}
            </h4>

            <p className="text-sm text-gray-500"> {data.data.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <img
                src={data.data.user.photo}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm text-gray-500">
                {data.data.user.name}
              </span>
              {data.data.user._id === authData._id && (
                <Link href={`/blog/edit/${data.data.slug}`}>
                  <div>
                    <AiOutlineEdit className="text-4xl cursor-pointer p-2 bg-red-500 rounded-full text-white" />
                  </div>
                </Link>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {data.data.likes.length} likes
              </span>
            </div>
          </div>
          <img
            src={data.data.featuredImage}
            alt={data.data.description}
            className="w-full mt-4 max-h-96 object-cover"
          />

          <div className="mt-4 w-[90%] mx-auto">{parse(data.data.content)}</div>
        </div>
        <div className="hidden md:block w-80 mt-32 mr-20">
          <div className="w-[90%] mx-auto flex flex-col gap-5">
            <div>
              <h4 className="text-2xl font-extrabold">Related Posts</h4>
              <hr className="border-4 border-blue-500 cursor-pointer hover:border-red-500 duration-500" />
            </div>
            <div className="flex flex-col gap-4">
              {data.relatedBlogs.map((blog: RelatedBlog) => (
                <div key={blog._id} className="flex flex-col gap-2">
                  <Link href={`/blog/${blog.slug}`}>
                    <h4 className="text-xl font-extrabold line-clamp-2 cursor-pointer hover:text-red-500 duration-500">
                      {blog.title}
                    </h4>
                  </Link>
                  <div className="flex gap-2 items-center justify-between">
                    <p className="text-sm text-gray-500">{blog.user.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(blog.createdAt).toDateString().slice(4)}
                    </p>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  try {
    const response = await api.fetchPost(slug as string);
    return { props: { data: response.data } };
  } catch (error: any) {
    if (error.response)
      return { props: { error: error.response.data.message } };
    else
      return {
        props: { error: "Something went wrong. Please reload to view content" },
      };
  }
};

export default BlogDetail;

/*
https://github.com/vercel/next.js/discussions/39880
Warning: data for page "/blog/[slug]" (path "/blog/this-is-a-sample-title") is 157 kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.
https://nextjs.org/docs/messages/large-page-data
*/
