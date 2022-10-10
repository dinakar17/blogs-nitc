// Note: Change in redux state will trigger only the component which is using that state and not the whole component tree like in class based components
import "react-tagsinput/react-tagsinput.css";

import Head from "next/head";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
// Todo: The bundle size of the editor is too large. Find a way to reduce it.
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store/store";
import { resetPost, setPost} from "../../store/StatesContainer/post/PostSlice";
import { resetFilters, setFilter} from "../../store/StatesContainer/filters/FilterSlice";

const Editor = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // It is not possible to create "custom message" with "beforeUnload" event
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      alert(
        "Are you sure you want to leave? Changes you made may not be saved."
      );
      // e.returnValue = "";
    });
  });


  useEffect(() => {
    if (localStorage.getItem("post")) {
      const post = JSON.parse(localStorage.getItem("post")!);
      dispatch(setPost(post));
      dispatch(setFilter(post));
      toast("Looks like you have an unsaved post. We have loaded it for you.", {
        type: "info",
        position: "bottom-right",
        autoClose: 5000,
        toastId: "draft",
        hideProgressBar: true,
      });
    } else {
      dispatch(resetPost());
      dispatch(resetFilters());
    }
  }, []);


  return (
    // https://stackoverflow.com/questions/64019051/how-do-i-display-data-created-by-suneditor-in-a-reactjs-app
    <>
      <Head>
        <title>Create Blog</title>

        <meta name="description" content="Create a blog" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content="Create Blog" />
        <meta property="og:description" content="Create a blog" />
      </Head>
      <Editor
        editorForUpdate={false}
        blogId={""}
      />
    </>
  );
};

export default Home;

// Todo: File preview or featuredImageURL is still remained after creating the blog. Fix this issue
// Todo: Enable editing for mobile devices
// Todo: Restrict images uploaded only to specific formats


/* 
next-dev.js?3515:20 Warning: A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.
*/