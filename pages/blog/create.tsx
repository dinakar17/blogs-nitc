import type { NextPage } from "next";
import dynamic from "next/dynamic";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { useRef } from "react";
// import { buttonList } from "suneditor-react";

// add the 'katex' library
import katex from "katex";
import "katex/dist/katex.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Home: NextPage = () => {
  const editor = useRef<SunEditorCore>(null);
  const saveContent = () => {
    const savedContent = editor.current?.getContents();
    console.log(savedContent);
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
      // image gallery
      ["imageGallery"],
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
  };

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };
  return (
    <div className="flex flex-col gap-5 w-[90%] mx-auto">
      {/* Title for the blog */}
      <div className="flex flex-col gap-2">
        <label>Title</label>
        <input
          required
          type="text"
          placeholder="Enter the title of the blog"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      {/* Summary of the blog */}
      <div className="flex flex-col gap-2">
        <label>Summary</label>
        <input
          required
          type="text"
          placeholder="Enter the summary of the blog"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      {/* Featured Image */}
        <div className="flex flex-col gap-2">
            {/* Todo: Hover effect */}
            <label>Featured Image</label>
            <input  
                required
                type="file"
                placeholder="Enter the summary of the blog"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
        </div>
      <div >
        <SunEditor
          getSunEditorInstance={getSunEditorInstance}
          setOptions={setOptions}
          height="500px"
          setDefaultStyle="font-family: 'Inter', sans-serif; font-size: 1.1rem;"
        />
      </div>
      <button
        onClick={saveContent}
        className="bg-blue-500 text-white p-2 rounded-md mx-auto"
      >
        Save
      </button>
    </div>
  );
};

export default Home;
