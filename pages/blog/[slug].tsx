import { AxiosResponse } from "axios";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";

import parse from "html-react-parser";

import * as api from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";

type Props = {
  data: AxiosResponse["data"];
  error: any;
};

const BlogDetail: NextPage<Props> = (props) => {
  const router = useRouter();

  const { data, error } = props;
  const { authData } = useSelector((state: RootState) => state.user);

  if (error) {
    toast(error, { type: "error" });
    return null;
  }
  console.log(data);
  return (
    <div className="md:w-[70%] mx-auto p-2 prose max-w-screen-xl prose-indigo md:prose-md prose-img:object-cover prose-img:rounded-lg prose-img:shadow-lg dark:prose-p:text-white">
      <Head>
        <title>{data.data.title}</title>
        <meta name="description" content={data.data.description} />
      </Head>
      <div className="w-[90%] mx-auto text-center">
        <h4 className="text-5xl font-extrabold">{data.data.title}</h4>

        <p className="text-sm text-gray-500"> {data.data.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          Author Image <br />
          Published Date Updated Date
          {data.data.user._id === authData._id && (
            <div className="flex gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => router.push(`/blog/edit/${data.data.slug}`)}
              >
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          )}
        </div>
        <div>Likes</div>
      </div>
      <img
        src={data.data.featuredImage}
        alt={data.data.description}
        className="w-full mt-4 max-h-96 object-cover"
      />

      <div className="mt-4 w-[90%] mx-auto">{parse(data.data.content)}</div>
      <hr />
    </div>
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
