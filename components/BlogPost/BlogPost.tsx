import React from "react";
import parse from "html-react-parser";
import Head from "next/head";

type PostDetails = {
  id: string;
  _id: string;
  title: string;
  description: string;
  featuredImage: string;
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
  tags: string[];
  content: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: Array<string>;
  reviewed: boolean;
  draft: boolean;
  slug: string;
};

type BlogPostProps = {
  data: {
    data: PostDetails;
    status: string;
  };
};

const BlogPost = ({ data }: BlogPostProps) => {
  // res.data === data
  const { title, description, featuredImage, content } = data.data;
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
  );
};

export default BlogPost;

/* 

{status: 'success', data: {…}}
data
: 
branch
: 
{value: 'general', label: 'General'}
content
: 
"<h1>Introduction<del>​</del></h1><p>YOLO (you onl
createdAt
: 
"2022-09-29T17:53:37.644Z"
description
: 
"Want to test your video using Yolov7 and Google Colab? Learn how to make real-time object detection using your own videos in this tutorial"
draft
: 
false
featuredImage
: 
"http://localhost:5001/uploads/adijsad_632461d1416122fc5212c05b_1664473604038"
id
: 
"6335dba1545023b79898ddfa"
likes
: 
[]
reviewed
: 
true
semester
: 
{value: '', label: ''}
slug
: 
"real-time-object-detection-using-yolov7-on-google-colab"
subject
: 
{value: '', label: ''}
tags
: 
(3) ['object detection', 'yolov7', 'machine learning']
title
: 
"Real Time Object Detection using YoloV7 on Google Colab"
updatedAt
: 
"2022-09-29T17:53:37.644Z"
user
: 
name
: 
"adijsad"
photo
: 
"http://localhost:5001/uploads/wp2638641.jpg"
_id
: 
"632461d1416122fc5212c05b"
[[Prototype]]
: 
Object
__v
: 
0
_id
: 
"6335dba1545023b79898ddfa"
[[Prototype]]
: 
Object
status
: 
"success"


Problem: 
next-dev.js?3515:20 Warning: A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.
*/
