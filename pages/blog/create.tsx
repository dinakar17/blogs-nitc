import type { NextPage } from "next";
import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";
import { useRef, useState } from "react";
// import { buttonList } from "suneditor-react";

import * as api from "../../api";

import "react-tagsinput/react-tagsinput.css";

// add the 'katex' library
import katex from "katex";
import "katex/dist/katex.min.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";
const Editor = dynamic(() => import("../../components/Editor/Editor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const editor = useRef<SunEditorCore>(null);
  const router = useRouter();

  // const token = useSelector((state: RootState) => state.user.authData.token);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [branch, setBranch] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [draft, setDraft] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleTags = (tags: string[]) => {
    setTags(tags);
  };

  const handleSelection = (branch: any) => {
    setBranch(branch);
  };

  const saveContent = async () => {
    const config = {
      headers: {
        //https://stackoverflow.com/questions/9870523/what-are-the-differences-between-application-json-and-application-x-www-form-url
        //https://dev.to/bcanseco/request-body-encoding-json-x-www-form-urlencoded-ad9
        "Content-Type": "application/json",
        // Todo: fetch the token from the local storage or redux store
        // Authorization: `Bearer ${token}`,
      },
    };
    const content = editor.current?.getContents();
    // console.log(savedContent);
    const dataToSend = {
      title,
      description,
      featuredImage,
      branch,
      tags,
      content,
      draft,
    };
    try {
      setLoading(true);
      // response - {data: {status: "success", data: doc}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
      const response = await api.createPost(dataToSend, config);
      setLoading(false);
      // enqueueSnackbar(`Blog Created`, { variant: 'success' });
      router.push(`/blog/edit/${response.data.data.slug}`);
    } catch (error: any) {
      setLoading(false);
      let errMessage;
      if (error.response) {
        errMessage = error.response.data.message;
      } else errMessage = "Something went wrong, Please try again later";
      // enqueueSnackbar(errMessage, { variant: 'error' });
    }
  };

  const setOptions = {
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["paragraphStyle", "blockquote"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      // "/", // Line break
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      ["table", "link", "image", "video", "audio", "math"], // You must add the 'katex' library at options to use the 'math' plugin.
      // ["imageGallery"],
      ["fullScreen", "showBlocks", "codeView"],
      ["preview", "print"],
      ["save", "template"],
    ],
    height: 400,
    width: "100%",
    placeholder: "Type here...",
    showPathLabel: false,
    resizingBar: false,
    charCounter: true,
    katex: katex,
    imageUploadUrl: process.env.NEXT_PUBLIC_IMAGE_API_URL,
  };

  return (
    // https://stackoverflow.com/questions/64019051/how-do-i-display-data-created-by-suneditor-in-a-reactjs-app
    <Editor
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      featuredImage={featuredImage}
      setFeaturedImage={setFeaturedImage}
      branch={branch}
      tags={tags}
      handleTags={handleTags}
      handleSelection={handleSelection}
      saveContent={saveContent}
      editor={editor}
      setDraft={setDraft}
    />
  );
};

export default Home;
