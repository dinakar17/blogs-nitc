import React from "react";

const BlogCard = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 w-[300px] shadow-lg">
      {/* Design and display a blog card */}
      <div className="flex flex-col h-[400px] w-[300px]  rounded-t-lg ">
        {/* Card Image */}
        <div className="w-full h-[45%]">
          <img
            src="https://picsum.photos/200/300"
            alt="blog image"
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        {/* Card Content */}
        <div className="flex flex-col gap-2 p-3 h-[40%] overflow-hidden">
          {/* Card tags */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-blue-500/50 text-blue-500 rounded-md px-2 py-1">
              Artificial Intelligence
            </span>
            <span className="bg-blue-500/50 text-blue-500 rounded-md px-2 py-1">
              Interview
            </span>
          </div>
          {/* Card Title */}
          <h1 className="text-xl font-semibold">Lorem ipsum dolor sit amet</h1>
          {/* Card Description */}
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptatibus quae voluptatum quibusdam,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptates, quod, quia, voluptatibus quae voluptatum quibusdam
          </p>
        </div>
        {/* Card author */}
        <div className="flex items-center  gap-2 p-3 h-[15%] overflow-hidden">
          {/* Rounded author image */}
          <div className="h-10 w-10 rounded-full bg-gray-300">
            <img
              src="https://picsum.photos/200/300"
              alt="author image"
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            {/* Author name */}
            <h1 className="text-sm font-semibold">Author Name</h1>
            {/* Published Date */}
            <p className="text-xs">Published on 15 Sep 2021</p>
          </div>
        </div>
      </div>
      {/* Liked by others */}
      <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 text-sm p-2 border border-gray-300 rounded-b-md w-[300px]">
        <p className="text-gray-500 text-center">
          10 people found this exciting
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
