// Todo: Remove @headlessui/react if this slows down the app
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as api from "../../api";
import { RootState } from "../../store/store";

type Props = {
  setDraft: (draft: boolean) => void;
  editorForUpdate: boolean;
  userId: string;
};

const Publish = ({ setDraft, editorForUpdate, userId }: Props) => {
  const router = useRouter();

  const { token } = useSelector((state: RootState) => state.user);

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
      // ? What if there is userId
      await api.deletePost(userId, config);
      setLoading(false);
      setShowModal(false);
      // handleDeleteDialogClose();
      toast("Blog Deleted", {
        type: "success",
      });
      router.push(`/user/my-profile`);
    } catch (error: any) {
      setLoading(false);
      // handleDeleteDialogClose();
      // enqueueSnackbar(`${error.response.data.message}`, { variant: "error" });
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 border-2 border-gray-200 p-5 rounded-md">
        <h2 className="text-2xl font-semibold">Publish</h2>
        <p>
          <span className="font-bold">Status:</span> Draft
        </p>
        <p>
          <span className="font-bold">Visibility:</span> Public
        </p>
        <div className="flex justify-between">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => {
              setDraft(true);
            }}
          >
            Save as Draft
          </button>
          {editorForUpdate ? (
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => {
                setDraft(false);
              }}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={() => {
                setDraft(false);
              }}
            >
              Publish
            </button>
          )}
          {editorForUpdate && (
            <button
              // Note: type button won't submit the form and will only call the function
              type="button"
              className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-toggle="modal"
              data-bs-target="#exampleModalCenter"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          )}
          {showModal && (
            <Modal setOpenModal={setShowModal} handleDelete={handleDelete} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 border-2 border-gray-200 p-5 rounded-md min-w-[25%]">
        <h1>Tips that might help your awesome blog!</h1>
        {/* Accordion here */}
        <ul>
          <li>Write a catchy title</li>
          <li>Use a good image</li>
          <li>Write a catchy title</li>
          <li>Use a good image</li>
          <li>Write a catchy title</li>
        </ul>
      </div>
    </>
  );
};

type ModalProps = {
  handleDelete: () => void;
  setOpenModal: (open: boolean) => void;
};

const Modal = ({ setOpenModal, handleDelete }: ModalProps) => {
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
                  Delete account ?
                </h4>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="items-center gap-2 mt-3 sm:flex">
                  <button
                    type="button"
                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                    onClick={handleDelete}
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
