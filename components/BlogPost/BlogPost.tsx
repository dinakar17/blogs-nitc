import React, { useEffect } from "react";
import parse from "html-react-parser";
import LikeUI from "../UI/Like/LikeUI";
import Link from "next/link";
import { Tooltip, Zoom } from "@mui/material";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { BlogPostDetails } from "../../pages/blog/[slug]";
import useSWR from "swr";
import { AxiosRequestConfig } from "axios";
import Image from "next/image";

import * as api from "../../api";
import { ThreeDotsLoader } from "../UI/Loader/Loader";
import CustomizedTooltip from "../UI/HTMLToolTip/HTMLTooltip";
import siteMetadata from "../../data/siteMetadata";
import { contentfulLoader } from "../../helpers/ImageURL/contentFulLoader";

type BlogPostProps = {
  data: {
    data: BlogPostDetails;
    // status: string;
  };
};

const fetcher = (url: string, config: AxiosRequestConfig) =>
  api.fetchLikes(url, config).then((res) => res.data);

const BlogPost = ({ data }: BlogPostProps) => {
  const { authData, token } = useSelector((state: RootState) => state.user);
  const [showLoader, setShowLoader] = React.useState(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = useSWR([`/api/v1/blogs/like/${data.data._id}`, config], fetcher, {
    // https://swr.vercel.app/docs/revalidation
    // refreshInterval: 1000,
  });

  useEffect(() => {
    if (!res.data) {
      setTimeout(() => {
        setShowLoader(true);
      }, 2000);
    }
  }, [res.isValidating]);

  return (
    <div className="w-[90%] lg:w-[70%] mx-auto p-2 prose prose-sm max-w-screen-xl prose-indigo md:prose-base dark:prose-invert overflow-auto">
      <div className="text-center">
        <h4 className="text-3xl lg:text-5xl font-extrabold">
          {data.data.title}
        </h4>

        <p className="text-sm">{data.data.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              {data.data.anonymous ? (
                <Image
                  src="/static/about/1.jpg"
                  alt="anonymous"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <CustomizedTooltip
                  name="author"
                  photo={data.data.user.photo}
                  bio={data.data.user.bio}
                >
                  <Image
                    src={data.data.user.photo}
                    loader={contentfulLoader}
                    alt={data.data.user.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </CustomizedTooltip>
              )}
            </div>
            <p className="flex flex-col justify-center">
              {data.data.anonymous ? "Anonymous" : data.data.user.name}
              <br />
              <span className="text-xs text-gray-500">
                Published on{" "}
                <span className="font-bold">
                  {new Date(data.data.createdAt).toDateString().slice(4)}
                </span>
              </span>
              {/* Problem: updatedAt is getting applied to all blogs */}
              {/* <span className="text-xs text-gray-500">
                Last updated{" "} <span className="font-bold">
                  {new Date(data.data.updatedAt).toDateString().slice(4)}
                  </span>
              </span> */}
            </p>
          </div>
          {authData && data.data.user._id === authData?._id && (
            <Link href={`/blog/edit/${data.data.slug}`}>
              <Tooltip
                TransitionComponent={Zoom}
                title="Edit"
                placement="top"
                style={{ backgroundColor: "skyblue" }}
              >
                <div className="cursor-pointer rounded-full w-10 h-10 flex items-center justify-center">
                  <i className="fa-solid fa-pencil"></i>
                </div>
              </Tooltip>
            </Link>
          )}
        </div>
        <div className="flex items-center scale-75 md:scale-100">
          {res.data ? (
            <>
              <LikeUI
                blogId={data.data._id}
                token={token}
                mutate={res.mutate}
                likes={res.data.likes}
              />
              <p className="text-lg font-bold">
                {new Intl.NumberFormat().format(res.data.likes.length) as any}{" "}
                {/* display "likes" text only if the user in larger screens */}
                <span className="hidden lg:inline">
                  {res.data.likes.length > 1 ? "likes" : "like"}
                </span>
              </p>
            </>
          ) : (
            showLoader && <ThreeDotsLoader />
          )}
        </div>
      </div>
      <div className="aspect-w-16 aspect-h-9">
        <Image
          src={
            data.data.featuredImage
              ? data.data.featuredImage
              : "/static/no_image.png"
          }
          loader={contentfulLoader}
          alt={data.data.description}
          className="shadow-lg rounded-md object-cover"
          layout="fill"
        />
      </div>

      <div className="mt-4">{parse(data.data.content)}</div>
      {/* Share on Twitter, FaceBook, instagram */}
      <div className="not-prose flex flex-wrap gap-2 items-center my-12">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="button"
        >
          <a
            href={`https://twitter.com/intent/tweet?text=${data.data.title}&url=${siteMetadata.siteUrl}/blog/${data.data.slug}&via=nitc`}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-twitter" />
            <span className="pl-2">Share</span>
          </a>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="button"
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${siteMetadata.siteUrl}/blog/${data.data.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-facebook" />
            <span className="pl-2">Share</span>
          </a>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="button"
        >
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${siteMetadata.siteUrl}/blog/${data.data.slug}`}
            target="_blank"
            rel="nofollow noreferrer"
          >
            <i className="fa-brands fa-linkedin" />
            <span className="pl-2">Share</span>
          </a>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="button"
        >
          {/* https://www.coderstool.com/share-social-link-generator */}
          <a
            href={`https://reddit.com/submit?url=${siteMetadata.siteUrl}/blog/${data.data.slug}&title=${data.data.title}&selftext=true`}
            target="_blank"
            rel="nofollow noopener"
          >
            <i className="fa-brands fa-reddit" />
            <span className="pl-2">Share</span>
          </a>
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          type="button"
        >
          <a
            href={`https://news.ycombinator.com/submitlink?u=${siteMetadata.siteUrl}/blog/${data.data.slug}&t=${data.data.title}`}
            target="_blank"
            rel="nofollow noreferrer"
          >
            <i className="fa-brands fa-y-combinator" />
            <span className="pl-2">Share</span>
          </a>
        </button>
      </div>
    </div>
  );
};

export default BlogPost;

/*
Problem: 
next-dev.js?3515:20 Warning: A component is `contentEditable` and contains `children` managed by React. 
It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. 
This is probably not intentional.
*/

// Todo: Fix loader delay issues
// Todo: Fix share on twitter, facebook, instagram
