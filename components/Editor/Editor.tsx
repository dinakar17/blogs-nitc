import "react-tagsinput/react-tagsinput.css";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import TagsInput from "react-tagsinput";
import dayjs from "dayjs";

import { uploadImage } from "../../api";
import { setOptions } from "./EditorOptions";
import Branch from "../../helpers/Options/Branch";
import Semester from "../../helpers/Options/Semester";
import Subject from "../../helpers/Options/Subject";
import FileInput from "../UI/FileInput/FileInput";
import InputField from "../UI/InputField/InputField";
import TextArea from "../UI/TextArea/TextArea";

import {
  setDescription,
  setFeaturedImage,
  setTags,
  setTitle,
} from "../../store/StatesContainer/post/PostSlice";
import * as api from "../../api";
import Publish from "./Publish";
import CustomizedTooltip from "../UI/HTMLToolTip/HTMLTooltip";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
// Todo: Remove this later
import { AxiosResponse } from "axios";
import { BlogPost } from "../../types";
import { toast } from "react-toastify";
import sanitize from "sanitize-filename";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

type EditorProps = {
  editorForUpdate: boolean;
  blogId: string;
  blogImgURL: string;
};

const Editor = (props: EditorProps) => {
  const editor = useRef<SunEditorCore>(null);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const {
    title,
    description,
    featuredImage,
    featuredImageURL,
    content,
    status,
    tags,
  } = useSelector((state: RootState) => state.post);
  const { branch, semester, subject } = useSelector(
    (state: RootState) => state.filter
  );
  const { authData, token } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);

  const { editorForUpdate, blogId, blogImgURL } = props;

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    // @ts-ignore
    editor.current = sunEditor;
  };

  // Todo: Add custom keyboard shortcuts
  // https://github.com/mkhstar/suneditor-react/issues/128
  // Sending uploaded images in the server to the backend
  const onImageUploadBefore = (
    files: FileList,
    info: { imageUploadUrl: string; imageUploadHeader: string },
    uploadHandler: any
  ) => {
    // change the file name
    const modifiedFileName = sanitize(
      `${authData?._id}-${dayjs(new Date())
        .format("DD-MM-YYYY-HH-mm-ss")
        .toString()
        .replace(/ /g, "-")}-${files[0].name}`
    );

    const newFile = new File([files[0]], modifiedFileName, {
      type: files[0].type,
    });
    const formData = new FormData();
    formData.append("profile-file", newFile);

    uploadImage(formData)
      .then((res) => {
        // console.log(res);
        res.data.result[0].url =
          process.env.NEXT_PUBLIC_IMAGE_API_URL +
          res.data.result[0].url.replace(/\\/g, "/");
        uploadHandler(res.data);
      })
      .catch((err) => {
        // console.log(err);
        alert("Image upload failed. Please try again later.");
      });
  };

  // Image upload to server
  const imageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("profile-file", file);
    try {
      const response: AxiosResponse = await api.uploadImage(formData);
      const url = response.data.result[0].url;
      const modified_url =
        process.env.NEXT_PUBLIC_IMAGE_API_URL + url.replace(/\\/g, "/");
      return modified_url;
    } catch (error: any) {
      // console.log(error);
      alert(error);
    }
  };

  const saveContent = async () => {
    // @ts-ignore
    const editorContent = editor.current?.getContents();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let dataToSend: BlogPost;

    try {
      setLoading(true);

      // delete prev image if a new change is made
      if (editorForUpdate && !featuredImageURL) {
        const imageName = blogImgURL.split("/").pop();
        await api.deleteImage(imageName as string);
      }

      let photoUrl = "";
      if (featuredImage) {
        photoUrl = await imageUpload(featuredImage as File);
      } else if (!featuredImage && !editorForUpdate) {
        throw new Error("Featured image is required");
      }
      dataToSend = {
        title,
        description,
        featuredImage: editorForUpdate
          ? photoUrl
            ? photoUrl
            : featuredImageURL
          : photoUrl,
        branch,
        semester,
        subject,
        tags,
        content: editorContent,
        draft: status.draft,
        anonymous: status.anonymous,
      };
      // * When editor is in update mode
      // // response - {data: {status: "success", data: doc}, status: 200, statusText: "Created", headers: {…}, config: {…}, …}
      if (editorForUpdate) {
        const response = await api.updatePost(blogId, dataToSend, config);
        setLoading(false);
        router.push(`/blog/${response.data.data.slug}`);
        if (response.data.data.draft) {
          toast("Draft saved successfully", {
            type: "success",
          });
        } else {
          toast.success("Blog updated successfully",{toastId: "blogUpdated"});
        }
      }
      // * When editor is in create mode
      // // response - {data: {status: "success", data: doc}, status: 201, statusText: "Created", headers: {…}, config: {…}, …}
      else {
        const response = await api.createPost(dataToSend, token);
        localStorage.removeItem("post");

        setLoading(false);
        if (!response.data.data.draft) {
          toast.success(
            "Blog created successfully. We'll notify you through email once it is published on the website."
            ,{toastId: "blogCreated"}
          );
        } else {
          toast.info("Blog saved as draft");
        }
        router.push(`/blog/${response.data.data.slug}`);
      }
    } catch (error: any) {
      // * If any thing goes wrong during update or create mode or image upload it will be catched here
      setLoading(false);
      let errMessage;
      // Todo: Fix this 
      if (error?.response?.data?.message) {
        errMessage = error.response.data.message;
      } else errMessage = error.message;

      if (!editorForUpdate && !featuredImage) {
        toast.error("Featured Image is required", {toastId: "featuredImageRequired"});
      } else if (!editorForUpdate) {
        // to prevent the data from being lost when an error occurs save the data in local storage
        // Note: dataToSend! prevents the error "Object is possibly 'undefined'"
        // localStorage.setItem("post", JSON.stringify(dataToSend!));
        toast(
          // `${errMessage}. Don't worry, we have saved your post. It will be available next time you visit this page.`,
          `${errMessage}`,
          {
            type: "error",
            toastId: "postError",
          }
        );
      } else toast.error(errMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveContent();
  };

  return (
    <form
      className="min-h-screen flex justify-center gap-10 mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4 w-[90%] md:w-[60%]">
        {/* Title for the blog */}
        <InputField
          value={title}
          label="Title"
          setState={setTitle}
          placeholder="Enter the title of the blog"
        />
        {/* Summary of the blog */}
        <TextArea
          value={description}
          label="Description"
          setState={setDescription}
          placeholder="Enter the description of the blog"
        />
        {/* Featured Image */}
        <div className="flex flex-col gap-2">
          <label className="flex gap-2 items-center mb-2 text-base font-medium text-gray-900 dark:text-gray-400">
            <span>Featured Image</span>
            <CustomizedTooltip name="featuredImage">
              <i className="invisible md:visible cursor-pointer fa-regular fa-circle-question"></i>
            </CustomizedTooltip>
          </label>
          <FileInput setImage={setFeaturedImage} image={featuredImage} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          {/* Select the branch */}
          <div className="z-[1001] flex flex-col gap-2">
            <label className="flex gap-2 items-center">
              <span>Select the branch</span>
              <CustomizedTooltip name="branch">
                <i className="invisible md:visible cursor-pointer fa-regular fa-circle-question"></i>
              </CustomizedTooltip>
            </label>
            <Branch />
            <div className="flex flex-col gap-2">
              <Semester />
            </div>
            <div className="flex flex-col gap-2">
              <Subject branch={branch.value} semester={semester.value} />
            </div>
          </div>
          {/* Tags */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <span>Tags</span>
              <CustomizedTooltip name="tags">
                <i className="fa-regular fa-circle-question"></i>
              </CustomizedTooltip>
            </label>
            <TagsInput
              data-cy="tags-input"
              required
              value={tags}
              onChange={(tags: any) => dispatch(setTags(tags))}
            />
          </div>
        </div>
        <div>
          <SunEditor
            getSunEditorInstance={getSunEditorInstance}
            // @ts-ignore
            setOptions={setOptions}
            height="900px"
            setDefaultStyle="font-family: 'Inter', sans-serif; font-size: 1rem;"
            // @ts-ignore
            onImageUploadBefore={onImageUploadBefore}
            defaultValue={content}
          />
        </div>
        {/* 
          {/* Todo: Future Feature if required 
        <Link href="/blog/preview"> 
          <a className="bg-blue-500 text-white p-2 rounded-md" target="_blank">
            Preview
          </a>
        </Link> */}
      </div>
      <div className="hidden md:block w-[25%] m-4">
        <div className="sticky top-0">
          <Publish
            editorForUpdate={editorForUpdate}
            blogId={blogId}
            blogImgURL={blogImgURL}
            publishing={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default Editor;

// Todo: Dark mode for SunEditor, Select and TagsInput

// const response = {
//   // The response must have a "result" array.
//   result: [
//     {
//       url: "https://imagev2api.linoxcloud.com/uploads/aquaman%20playdate.jpg",
//       name: "image name",
//       size: "561276",
//     },
//   ],
// };
// uploadHandler(response);
// const onImageUpload = (
//   targetImgElement: HTMLImageElement,
//   index: number,
//   state: string,
//   imageInfo: {
//     name: string;
//     size: number;
//     type: string;
//     width: number;
//     height: number;
//     alt: string;
//     link: string;
//   },
//   remainingFilesCount: number
// ) => {
//   console.log(targetImgElement, index, state, imageInfo, remainingFilesCount);
//   // targetImgElement.src = "https://picsum.photos/200/300";
// };

// Todo: Replace tagsinput with tagify
