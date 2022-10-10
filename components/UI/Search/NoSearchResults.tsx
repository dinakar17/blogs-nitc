import React from "react";
// Todo: Redesign the No Search Results page

const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mt-20">
      <h1 className="text-2xl text-center font-semibold text-gray-500 dark:text-gray-300">
        Sorry, No blogs found for your search!
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-300">
        Try searching for something else
      </p>
      <p className="text-center text-gray-500 dark:text-gray-300">
        Suggestions:
      </p>
      <ul>
        <li className="text-center text-gray-500 dark:text-gray-300">
          Make sure that all words are spelled correctly.
        </li>
        <li className="text-center text-gray-500 dark:text-gray-300">
          Try different keywords.
        </li>
        <li className="text-center text-gray-500 dark:text-gray-300">
          Try more general keywords.
        </li>
        <li className="text-center text-gray-500 dark:text-gray-300">
          Try fewer keywords.
        </li>
      </ul>
    </div>
  );
};

export default NoSearchResults;
