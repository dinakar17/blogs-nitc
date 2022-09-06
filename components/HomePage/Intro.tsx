import Image from "next/image";
import React from "react";

const Intro = () => {
  return (
    // Two equi-spaced columns using grid
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-center gap-5">
        <h1 className="text-8xl font-bold">Share your</h1>
        <h1 className="text-8xl font-bold">Experience</h1>
        <button className="bg-blue-500 text-2xl text-white px-4 py-2 rounded-md mr-auto mt-12">
          {" "}
          See all posts
        </button>
      </div>
      <div>
        <Image src="/static/hero.jpg" width={500} height={500} />
        {/* Arrow symbol */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Intro;
