import React from "react";
import parse from "html-react-parser";
import Head from "next/head";

const BlogPost = ({data}) => {
  console.log(data);
    const {title, description, featuredImage, content} = data.data;
  return (
    <div className="mx-auto p-4 prose max-w-screen-xl prose-indigo prose-md">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <h4 className="text-2xl font-bold">{title}</h4>

      <p className="text-sm text-gray-500"> {description}</p>
      <img
        src={featuredImage}
        alt={description}
        className="w-full mt-4 max-h-96 object-cover"
      />

      <div className="mt-4">{parse(content)}</div>
      <hr />
    </div>
  )
};

export default BlogPost;
