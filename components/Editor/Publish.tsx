import React from "react";

type Props = {
  setDraft: (draft: boolean) => void;
  editorForUpdate: boolean;
};

const Publish = ({ setDraft, editorForUpdate }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-5 border-2 border-gray-200 p-5 rounded-md">
        <h2 className="text-2xl font-semibold">Publish</h2>
        {/* Status: Draft */}
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
              type="submit"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Delete
            </button>
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

export default Publish;
