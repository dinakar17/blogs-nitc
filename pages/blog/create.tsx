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
import  { useRouter } from "next/router";
const Editor = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false,
});

interface BranchProps {
  value: string;
  label: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  const editor = useRef<SunEditorCore>(null);
  const token = useSelector((state: RootState) => state.user.token);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [branch, setBranch] = useState<BranchProps>({ value: "", label: "" });
  const [semester, setSemester] = useState<BranchProps>({ value: "", label: "" });
  const [tags, setTags] = useState<string[]>([]);
  const [draft, setDraft] = useState(false);
  const [blogData, setBlogData] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // It is not possible to create "custom message" with "beforeUnload" event
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      // alert("Are you sure you want to leave?");
      // e.returnValue = "";
    });
  });
  
  const saveContent = async () => {
    const config = {
      headers: {
        //https://stackoverflow.com/questions/9870523/what-are-the-differences-between-application-json-and-application-x-www-form-url
        //https://dev.to/bcanseco/request-body-encoding-json-x-www-form-urlencoded-ad9
        "Content-Type": "application/x-www-form-urlencoded",
        // Todo: fetch the token from the local storage or redux store
        Authorization: `Bearer ${token}`,
      },
    };
    // @ts-ignore
    const content = editor.current?.getContents();

    const dataToSend = {
      title,
      description,
      featuredImage,
      branch: branch.value,
      tags,
      content,
      draft,
    };
    try {
      setLoading(true);
      // // response - {data: {status: "success", data: doc}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
      const response = await api.createPost(dataToSend, config);
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

  console.log(branch);

  return (
    // https://stackoverflow.com/questions/64019051/how-do-i-display-data-created-by-suneditor-in-a-reactjs-app
    <>
      <Editor
        setTitle={setTitle}
        setDescription={setDescription}
        featuredImage={featuredImage}
        setFeaturedImage={setFeaturedImage}
        branch={branch}
        setBranch={setBranch}
        semester={semester}
        setSemester={setSemester}
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
