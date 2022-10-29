import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Switch from "@mui/material/Switch";

import * as api from "../../api";
import { AppDispatch, RootState } from "../../store/store";
import SimpleAccordion from "../UI/CustomAccordion/CustomAccordion";
// Todo: Bundle size is too large, need to optimize
import {
  setAnonymous,
  setDraft,
} from "../../store/StatesContainer/post/PostSlice";
import CustomizedTooltip from "../UI/HTMLToolTip/HTMLTooltip";
import CustomDialog from "../UI/CustomDialog/CustomDialog";

type Props = {
  editorForUpdate: boolean;
  blogId: string;
  blogImgURL: string;
  publishing: boolean;
};

const Publish = ({
  editorForUpdate,
  blogId,
  blogImgURL,
  publishing,
}: Props) => {
  const router = useRouter();

  const { token } = useSelector((state: RootState) => state.user);
  const { status } = useSelector((state: RootState) => state.post);

  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const imageAxiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMAGE_SERVER_KEY}`,
      },
    };

    try {
      setLoading(true);
      if (blogImgURL) {
        const fileName = blogImgURL.split("/").pop();
        await api.deleteImage(fileName as string, imageAxiosConfig);
      }
      await api.deletePost(blogId, config);
      setLoading(false);
      setShowModal(false);
      toast.success("Blog deleted successfully", {toastId: "blogDeleted"});
      router.push(`/user/my-profile`);
    } catch (error: any) {
      setLoading(false);
      setShowModal(false);
      let errMessage = "Something went wrong, Please try again later";
      if (error.response.data.message) {
        errMessage = error.response.data.message;
      }
      toast.error(errMessage);
    }
  };

  let blogStatus = "---",
    visibility = "---";
  if (status.draft === false && status.reviewed === false) {
    blogStatus = "🚀 Under Review";
    visibility = "Private";
  } else if (status.draft === false && status.reviewed === true) {
    blogStatus = "Published ✅";
    visibility = "Public";
  } else if (status.draft === true && status.reviewed === false) {
    blogStatus = "Draft";
    visibility = "Private";
  } else if (status.draft === true && status.reviewed === true) {
    blogStatus = "Published ✅";
    visibility = "Private";
  }

  return (
    <>
      <div className="flex flex-col gap-5 border-2 border-gray-200 p-5 rounded-md">
        <h2 className="text-2xl font-semibold">Publish</h2>
        <p>
          <span data-cy="blog-status" className="font-bold">Status:</span>{" "}
          {editorForUpdate ? blogStatus : "---"}
        </p>
        <p>
          <span data-cy="blog-visibility" className="font-bold">Visibility:</span>{" "}
          {editorForUpdate ? visibility : "---"}
        </p>
        <div className="flex items-center gap-2">
          <Switch
            checked={status.anonymous}
            onChange={() => dispatch(setAnonymous(!status.anonymous))}
          />
          <label className="font-medium">Anonymous</label>
          <CustomizedTooltip name="anonymous">
            <i className="invisible md:visible cursor-pointer fa-regular fa-circle-question"></i>
          </CustomizedTooltip>
        </div>
        <div className="flex flex-wrap justify-between">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            onClick={() => {
              dispatch(setDraft(true));
            }}
          >
            Save as Draft
          </button>
          {editorForUpdate ? (
            <button
              id="update"
              type="submit"
              className={`text-white hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                publishing
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
              }`}
              onClick={() => {
                dispatch(setDraft(false));
              }}
              disabled={publishing}
            >
              Update
            </button>
          ) : (
            <button
              id="publish"
              type="submit"
              className={`text-white hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                publishing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
              }`}
              onClick={() => {
                dispatch(setDraft(false));
              }}
              disabled={publishing}
            >
              Publish
            </button>
          )}
          {editorForUpdate && (
            <>
              <button
                id="delete"
                // Note: type button won't submit the form and will only call the function
                type="button"
                className={`text-white hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${
                  loading
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                }`}
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
                onClick={() => setShowModal(true)}
                disabled={loading}
              >
                Delete
              </button>
              {showModal && (
                <CustomDialog
                  open={showModal}
                  setOpen={setShowModal}
                  handleDelete={handleDelete}
                  loading={loading}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-5 border-2 border-gray-200 p-5 rounded-md min-w-[25%]">
        <h1 className="text-lg font-bold">
          Tips that might help your awesome blog!
        </h1>
        {/* Accordion here */}
        <SimpleAccordion />
      </div>
    </>
  );
};


export default Publish;

// Todo: Change router to Link
