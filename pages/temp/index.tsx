import React from "react";

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mx-auto">
      <div className="flex flex-col gap-5 border-2 border-gray-200 p-5 rounded-md">
        <h2 className="text-2xl font-semibold">Publish</h2>
        {/* Status: Draft */}
        <p>
          <span className="font-bold">Status:</span> Draft
        </p>
        <p>
          <span className="font-bold">Visibility:</span> Public
        </p>
        <div>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Publish
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-2 border-gray-200 p-5 rounded-md min-w-[25%]">
        <h1>Tips that might help your awesome blog!</h1>
        {/* Generate some random tips for writing better blogs */}
        <ul>
          <li>Write a catchy title</li>
          <li>Use a good image</li>     
          <li>Write a catchy title</li>
          <li>Use a good image</li>
          <li>Write a catchy title</li>
        </ul>
      </div>
    </div>
  );
};

export default index;

// Todo
// 1. Search all Tailwind UI components in https://flowbite.com/ website
// 2. https://tailwind-elements.com/docs/standard/components/images/
