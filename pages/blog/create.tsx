import type { NextPage } from "next";
import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";
import { useEffect, useRef, useState } from "react";

/* 
next-dev.js?3515:20 Warning: A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.
*/
import * as api from "../../api";

import "react-tagsinput/react-tagsinput.css";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";

const Editor = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false,
});

// Note: Change in redux state will trigger only the component which is using that state and not the whole component tree like in class based components
const Home: NextPage = () => {
  console.log("I am create page and helps in creating a blog and I am rendered");
  const router = useRouter();

  const token = useSelector((state: RootState) => state.user.token);
  const { branch, semester, subject } = useSelector(
    (state: RootState) => state.filter
  );
  const { title, description, featuredImage, content } = useSelector(
    (state: RootState) => state.post
  );

  const editor = useRef<SunEditorCore>(null);

  const [tags, setTags] = useState<string[]>([]);
  const [draft, setDraft] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // It is not possible to create "custom message" with "beforeUnload" event
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      alert("Are you sure you want to leave?");
      // e.returnValue = "";
    });
  });

  const imageUpload = async (file: File) => {
    // console.log(file);
    const formData = new FormData();
    formData.append("profile-file", file);
    try {
      const response: AxiosResponse = await api.uploadImage(formData);
      console.log(response);
      // console.log(response.data.data);
      const url = response.data.result[0].url;
      const modified_url =
        process.env.NEXT_PUBLIC_IMAGE_API_URL + url.replace(/\\/g, "/");
      // console.log(modified_url);
      return modified_url;
    } catch (error: any) {
      console.log(error);
      alert(error);
    }
  };

  const saveContent = async () => {
    // @ts-ignore
    const content = editor.current?.getContents();

    try {
      setLoading(true);
      // if the below code returns error, then it will be caught by the catch block since it is an async function and it will be handled by the catch block
      let photoUrl = "";
      if (featuredImage) {
        photoUrl = await imageUpload(featuredImage as File);
      }
      const dataToSend = {
        title,
        description,
        featuredImage: photoUrl,
        branch: branch.value,
        tags,
        content,
        draft,
      };
      // // response - {data: {status: "success", data: doc}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
      const response = await api.createPost(dataToSend, token);
      setLoading(false);
      console.log(response);
      toast.success("Blog created successfully");
      router.push("/blog/success");
      // setBlogData(response.data.data);
      // setLoading(false);
      // // enqueueSnackbar(`Blog Created`, { variant: 'success' });
      // // router.push(`/blog/edit/${response.data.data.slug}`);
    } catch (error: any) {
      setLoading(false);
      let errMessage;
      if (error.response) {
        errMessage = error.response.data.message;
      } else errMessage = "Something went wrong, Please try again later";
      toast.error(errMessage);
    }
  };

  return (
    // https://stackoverflow.com/questions/64019051/how-do-i-display-data-created-by-suneditor-in-a-reactjs-app
    <>
      <Editor
        featuredImage={featuredImage}
        branch={branch}
        semester={semester}
        tags={tags}
        setTags={setTags}
        saveContent={saveContent}
        editor={editor}
        setDraft={setDraft}
        loading={loading}
      />
      {/* Upload Image to the server */}
      {/* Convert this string html "<p>You faith you ne<span style=\"color: rgb(255, 0, 0);\">ed to prove&nbsp;</span></p>" to normal html*/}
    </>
  );
};

export default Home;
