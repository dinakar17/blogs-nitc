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

    try {
      setLoading(true);
      if (blogImgURL) {
        const fileName = blogImgURL.split("/").pop();
        await api.deleteImage(fileName as string);
      }
      await api.deletePost(blogId, config);
      setLoading(false);
      setShowModal(false);
      toast("Blog Deleted", {
        type: "success",
      });
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
          <span className="font-bold">Status:</span>{" "}
          {editorForUpdate ? blogStatus : "---"}
        </p>
        <p>
          <span className="font-bold">Visibility:</span>{" "}
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
              Publish
            </button>
          )}
          {editorForUpdate && (
            <>
              <button
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
                <Modal
                  setOpenModal={setShowModal}
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

type ModalProps = {
  handleDelete: () => void;
  setOpenModal: (open: boolean) => void;
  loading: boolean;
};

const Modal = ({ setOpenModal, handleDelete, loading }: ModalProps) => {
  return (
    // Todo: Play with z-index for content editor, branch and this modal
    <>
      <div className="fixed inset-0 z-[10000] overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mt-2 text-center sm:ml-4 sm:text-left">
                <h4 className="text-lg font-medium text-gray-800">
                  Delete Blog ?
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                  Deleting this blog will permanently remove it from the
                  database. Are you sure you want to delete this blog?
                </p>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    type="button"
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publish;

// Todo: Change router to Link
