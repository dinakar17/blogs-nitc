import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { AppDispatch, RootState } from "../../../store/store";
import { setFeaturedImageURL } from "../../../store/StatesContainer/post/PostSlice";
import { toast } from "react-toastify";
import sanitize from "sanitize-filename";

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
    setPreview(null);
  }, []);

  useEffect(() => {
    if (!image) {
      setImage(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const deletePrev = async () => {
    if (featuredImageURL) {
      dispatch(setFeaturedImageURL(""));
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const modifiedFileName = sanitize(`${authData?._id}-${dayjs(new Date())
          .format("DD-MM-YYYY-HH-mm-ss")
          .toString()
          .replace(/ /g, "-")}-${e.target.files[0].name}`);

        const newFile = new File([e.target.files[0]], modifiedFileName, {
          type: e.target.files[0].type,
        });

        dispatch(setImage(newFile));
        // delete the previous image from the server
        deletePrev();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDropUpload = (e: React.DragEvent<HTMLDivElement>) => {
    try {
      e.preventDefault();
      if (e.dataTransfer.files) {
        const modifiedFileName = sanitize(`${authData?._id}-${dayjs(new Date())
          .format("DD-MM-YYYY-HH-mm-ss")
          .toString()
          .replace(/ /g, "-")}-${e.dataTransfer.files[0].name}`);

        const newFile = new File([e.dataTransfer.files[0]], modifiedFileName, {
          type: e.dataTransfer.files[0].type,
        });

        dispatch(setImage(newFile));
        // delete the previous image from the server
        deletePrev();
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="flex justify-center items-center w-full"
      draggable
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDropUpload}
      data-cy="file-input"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        {preview || featuredImageURL ? (
          <div className="flex justify-center items-center w-full h-full">
            <img
              data-cy="file-input-image"
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
          // required
          onChange={handleUpload}
        />
      </label>
    </div>
  );
};

export default FileInput;
