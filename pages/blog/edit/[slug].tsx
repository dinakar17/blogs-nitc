import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import { NextPage } from "next";
import { AxiosResponse } from "axios";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setPost } from "../../../store/StatesContainer/post/PostSlice";
import { setFilter } from "../../../store/StatesContainer/filters/FilterSlice";
import * as api from "../../../api";
import Loader from "../../../components/UI/Loader/Loader";

const Editor = dynamic(() => import("../../../components/Editor/Editor"));

const fetcher = (url: string, slug: string) =>
  // res.data = {success: true, data: doc}
  api.getSpecificPost(url, slug).then((res: AxiosResponse) => res.data);

const EditBlog: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    toast("Reload the page if you are facing any issues", {
      type: "info",
      toastId: "editBlog",
      autoClose: 2000,
      position: "bottom-left",
    });
  }, []);

  const { slug } = router.query;

  const { data, error } = useSWR(
    slug ? ["/api/v1/blogs/slug/", slug] : null,
    fetcher,
    {
      // data === {success: true, data: doc}
      onSuccess: (data) => {
        dispatch(setPost(data.data));
        dispatch(setFilter(data.data));
      },
      // Note: If this is true and then useSWR makes request to the backend every time you change the tab in the browser
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (error) {
      let errMessage;
      if (error.response) {
        errMessage = error.response.data.message;
      } else errMessage = "Something went wrong, Please try again later";

      toast(errMessage, {
        type: "error",
      });
    }
  }, [error]);

  if (!data) return <Loader />;

  return (
    <>
      <Head>
        <title>Edit blog</title>
        <meta name="description" content="Edit blog page for Blog App" />
      </Head>
      <h1 className="text-center text-3xl underline font-bold my-4 text-blue-500">
        Edit your Blog
      </h1>
      <Editor
        editorForUpdate={true}
        blogId={data.data._id}
      />
    </>
  );
};

export default EditBlog;

/*

The service worker navigation preload request was cancelled before 'preloadResponse' settled. If you intend to use 'preloadResponse', use waitUntil() or respondWith() to wait for the promise to settle.
*/

// Todo: Fix Buttons size for medium and small screens
// Todo: In some situations editorContent is empty and the content is not shown in the editor
