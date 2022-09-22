import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
// import { buttonList } from "suneditor-react";
import Select from "react-select";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

import { RefObject } from "react";
import { AxiosResponse } from "axios";
import { uploadImage } from "../../api";
import { setOptions } from "./EditorOptions";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

type BranchProps = {
  value: string;
  label: string;
};

type EditorProps = {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  featuredImage: string;
  setFeaturedImage: (featuredImage: string) => void;
  branch: BranchProps;
  setBranch: (branch: BranchProps) => void;
  semester: BranchProps;
  setSemester: (semester: BranchProps) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  saveContent: () => void;
  editor: RefObject<SunEditorCore>;
  setDraft: (draft: boolean) => void;
  loading: boolean;
  // imageUpload: (file: File) => Promise<void>;
};

const options = [
  // list of of all engineering branches
  { value: "cse", label: "Computer Science" },
  { value: "ece", label: "Electronics and Communication" },
  { value: "mech", label: "Mechanical" },
  { value: "civil", label: "Civil" },
  { value: "eee", label: "Electrical and Electronics" },
  { value: "it", label: "Information Technology" },
  { value: "chem", label: "Chemical" },
];

const semesterOptions = [
  { value: "1", label: "1st Semester" },
  { value: "2", label: "2nd Semester" },
  { value: "3", label: "3rd Semester" },
  { value: "4", label: "4th Semester" },
  { value: "5", label: "5th Semester" },
  { value: "6", label: "6th Semester" },
  { value: "7", label: "7th Semester" },
  { value: "8", label: "8th Semester" },
];

const Editor = (props: EditorProps) => {
  const {
    setTitle,
    setDescription,
    featuredImage,
    setFeaturedImage,
    branch,
    setBranch,
    semester,
    setSemester,
    tags,
    setTags,
    saveContent,
    editor,
    setDraft,
    loading,
    // imageUpload
  } = props;

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    // @ts-ignore
    editor.current = sunEditor;
  };

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

  const imageUpload = async (file: File) => {
    // console.log(file);
    const formData = new FormData();
    formData.append("profile-file", file);
    try {
      const response: AxiosResponse = await uploadImage(formData);
      console.log(response);
      // console.log(response.data.data);
      const url = response.data.result[0].url;
      const modified_url =
        process.env.NEXT_PUBLIC_IMAGE_API_URL + url.replace(/\\/g, "/");
      // console.log(modified_url);
      setFeaturedImage(modified_url);
    } catch (error: any) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-[90%] mx-auto">
      {/* Title for the blog */}
      <div className="flex flex-col gap-2">
        <label>Title</label>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the title of the blog"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      {/* Summary of the blog */}
      <div className="flex flex-col gap-2">
        <label>Description</label>
        <textarea
          required
          rows={2}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the Description of the blog"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Featured Image */}
      <div className="flex flex-col gap-2">
        {/* Todo: Hover effect */}
        <label>Featured Image</label>
        <input
          type="file"
          onChange={(e: any) => imageUpload(e.target.files[0])}
          placeholder="Enter the summary of the blog"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        {featuredImage && (
          <div className="w-24 h-10">
            <img
              src={featuredImage}
              alt="featured"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Select the branch */}
        <div className="flex flex-col gap-2">
          <label className="">Select the branch</label>
          <Select
            options={options}
            className="z-[1000]"
            onChange={(e: any) => setBranch(e) as any}
          />
          {branch && (
            <div className="flex flex-col gap-2">
              <label className="">Select the semester</label>
              <Select
                options={semesterOptions}
                className="z-[1000]"
                onChange={(e: any) => setSemester(e) as any}
              />
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
