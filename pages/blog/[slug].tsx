import { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";

import * as api from "../../api";
import { useEffect, useState } from "react";
import BlogPost from "../../components/BlogPost/BlogPost";
import RelatedPosts from "../../components/BlogPost/RelatedPosts";
import { BlogSEO } from "../../components/SEO/SEO";
import siteMetadata from "../../data/siteMetadata";


export type RelatedBlog = {
  _id: string;
  title: string;
  user: Array<{ name: string }> | { name: string };
  createdAt: string;
  featuredImage: string;
  slug: string;
  id: string;
  anonymous: boolean;
};

export type BlogPostDetails = {
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
    bio: string;
  };
  likes: Array<{ user: string }>;
  draft: boolean;
  reviewed: boolean;
  anonymous: boolean;
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

/* Main Component */

const BlogDetail: NextPage<Props> = (props) => {
  const { data, error } = props;

  useEffect(() => {
    if (error) {
      toast(error, {
        type: "error",
        autoClose: 5000,
        toastId: "blog-detail-error",
      });
    }
  }, [error]);

  if (error) {
    return null;
  }

  const metaData = {
    title: data.data.title,
    summary: data.data.description,
    images: [data.data.featuredImage],
    url : `${siteMetadata.siteUrl}blog/${data.data.slug}`,
    canonicalUrl: `${siteMetadata.siteUrl}/blog/${data.data.slug}`,
    date: data.data.createdAt,
    lastmod: data.data.updatedAt,
    authorDetails: [data.data.user],
  }
  return (
    <>
      <BlogSEO {...metaData} />
      {/* https://css-tricks.com/equal-columns-with-flexbox-its-more-complicated-than-you-might-think/ */}
      <div className="grid grid-cols-1 lg:grid-flow-col justify-evenly">
        {/* Grid Block 1 */}
        <BlogPost data={data} />
        {/* Grid Block 2 */}
        <RelatedPosts data={data} />
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

// Todo: Fix dark mode text color
// Todo: Add prism.js or highlight.js for code blocks
// Todo: Also add Last Updated time