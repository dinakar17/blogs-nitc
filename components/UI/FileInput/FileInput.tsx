import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

type Props = {
  setImage: ActionCreatorWithPayload<any, string>;
  image: Blob | File | null;
};

const FileInput = ({ setImage, image }: Props) => {
  const { authData } = useSelector((state: RootState) => state.user);
  const { featuredImageURL } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch<AppDispatch>();

  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>(
    null
  );

  useEffect(() => {
    if (!image) {
      setImage(null);
      return;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);
  return (
    <div className="flex justify-center items-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {preview || featuredImageURL ? (
          <div className="flex justify-center items-center w-full h-full">
            <img
              src={preview ? preview.toString() : featuredImageURL}
              alt="preview"
              // if height set to auto then the image will be stretched to fit the container
              className="max-w-full h-full object-cover bg-white border rounded p-1"
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-5 pb-6">
            <svg
              aria-hidden="true"
              className="mb-3 w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        )}
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          required
          onChange={(e) => {
            if (e.target.files) {
              // The below code creates a new File [e.target.files[0]] with the same properties as the original File [image] but with a new name [authData?.username + Date.now() + e.target.files[0].name]
              const file = new File(
                [e.target.files[0]],
                `${authData.name}_${authData._id}_${Date.now()}`
              );
              dispatch(setImage(file));
            }
          }}
        />
      </label>
    </div>
  );
};
// draggble is used to make the input element draggable and dropable

export default FileInput;
