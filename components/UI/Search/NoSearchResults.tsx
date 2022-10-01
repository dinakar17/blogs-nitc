import React from "react";
// Todo: Redesign the No Search Results page

const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mt-20">
      <h1 className="text-2xl text-center font-semibold text-gray-500 dark:text-gray-300">
        No blogs found
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300">
        Try searching for something else
      </p>
    </div>
  );
};

export default NoSearchResults;
