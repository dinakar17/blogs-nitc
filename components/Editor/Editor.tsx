import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

import { RefObject } from "react";
import { AxiosResponse } from "axios";
import { uploadImage } from "../../api";
import { setOptions } from "./EditorOptions";
import Branch from "../../helpers/Options/Branch";
import Semester from "../../helpers/Options/Semester";
import Subject from "../../helpers/Options/Subject";
import Link from "next/link";
import FileInput from "../UI/FileInput/FileInput";
import InputField from "../UI/InputField/InputField";
import TextArea from "../UI/TextArea/TextArea";
import { setDescription, setFeaturedImage, setTitle } from "../../store/StatesContainer/post/PostSlice";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

type BranchProps = {
  value: string;
  label: string;
};

type EditorProps = {
  featuredImage: File | null | Blob;
  branch: BranchProps;
  semester: BranchProps;
  tags: string[];
  setTags: (tags: string[]) => void;
  saveContent: () => void;
  editor: RefObject<SunEditorCore>;
  setDraft: (draft: boolean) => void;
  loading: boolean;
  // imageUpload: (file: File) => Promise<void>;
};

const Editor = (props: EditorProps) => {
  const {
    featuredImage,
    branch,
    semester,
    tags,
    setTags,
    saveContent,
    editor,
    setDraft,
    loading,
  } = props;

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    // @ts-ignore
    editor.current = sunEditor;
  };

  // Todo: Add custom keyboard shortcuts

  // https://github.com/mkhstar/suneditor-react/issues/128
  const onImageUploadBefore = (
    files: FileList,
    info: { imageUploadUrl: string; imageUploadHeader: string },
    uploadHandler: any
  ) => {
    const formData = new FormData();
    formData.append("profile-file", files[0]);
    // console.log(info, uploadHandler, files);

    uploadImage(formData)
      .then((res) => {
        console.log(res);
        res.data.result[0].url =
          process.env.NEXT_PUBLIC_IMAGE_API_URL +
          res.data.result[0].url.replace(/\\/g, "/");
        uploadHandler(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Image upload failed");
      });
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
  };

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

  const isBranch = (value: string) => {
    if (value === "general" || value === "campus_placements" || value === "") {
      // in order to prevent showing select subject option
      // The below line of code freezes the app for some reason
      // setSemester({ value: "", label: "Select Semester" });
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-4 w-[90%] mx-auto">
      {/* Title for the blog */}
      <InputField
        label="Title"
        setState={setTitle}
        placeholder="Enter the title of the blog"
      />
      {/* Summary of the blog */}
      <TextArea
        label="Description"
        setState={setDescription}
        placeholder="Enter the description of the blog"
      />
      {/* Featured Image */}
      <div className="flex flex-col gap-2">
        {/* Todo: Hover effect */}
        <label className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400">
          Featured Image
        </label>
        <FileInput setImage={setFeaturedImage} image={featuredImage} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Select the branch */}
        <div className="flex flex-col gap-2 z-[1000]">
          <label className="">Select the branch</label>
          <Branch />
          {isBranch(branch.value) && (
            <div className="flex flex-col gap-2">
              <label className="">Select the semester</label>
              <Semester />
            </div>
          )}
          {semester.value && (
            <div className="flex flex-col gap-2">
              <label className="">Select the Subject </label>
              <Subject branch={branch.value} semester={semester.value} />
            </div>
          )}
        </div>
        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label>Tags</label>
          <TagsInput value={tags} onChange={(tags: any) => setTags(tags)} />
        </div>
      </div>
      <div>
        <SunEditor
          getSunEditorInstance={getSunEditorInstance}
          // @ts-ignore
          setOptions={setOptions}
          height="900px"
          setDefaultStyle="font-family: 'Inter', sans-serif; font-size: 1.1rem;"
          // @ts-ignore
          onImageUploadBefore={onImageUploadBefore}
          // onImageUpload={onImageUpload}
        />
      </div>
      <div className="flex justify-center gap-10">
        <button
          onClick={saveContent}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          {loading ? "Saving..." : "Save"}
        </button>
        {/* Preview button */}
        <Link href="/temp">
          <a className="bg-blue-500 text-white p-2 rounded-md" target="_blank">
            Preview
          </a>
        </Link>
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => setDraft(true)}
        >
          Save as Draft
        </button>
      </div>
    </div>
  );
};

export default Editor;
