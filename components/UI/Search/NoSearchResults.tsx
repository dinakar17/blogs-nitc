import React from "react";
// Todo: Redesign the No Search Results page

const NoSearchResults = () => {
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen mt-20 text-gray-500 dark:text-gray-300 w-[90%] md:w-[60%] mx-auto">
      <h1 className="text-2xl text-center font-semibold">
        Sorry, No blogs found for your search!
      </h1>
      <p>Try searching for something else</p>
      <div className="prose max-w-none">
      <ul className="">
        <p className="mb-2">Suggestions:</p>
        <li>Make sure that all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
        <li>Try fewer keywords.</li>
      </ul>
      </div>
    </div>
  );
};

export default NoSearchResults;
