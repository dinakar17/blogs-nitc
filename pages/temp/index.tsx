import Image from "next/image";
import React from "react";

const index = () => {
  return (
    <div className="grid grid-cols-2 w-[60%] mx-auto bg-blue-500 rounded-lg shadow-2xl gap-10 my-5">
      <div className="aspect-w-16 aspect-h-12">
        <img src="/static/hero.jpg"  className="object-cover rounded-l-lg" />
      </div>
      <div className="flex flex-col h-full w-full justify-center gap-10">
        <h1 className="text-4xl font-bold">User Name</h1>
        <p className="text-2xl">Email Id</p>
        <p className="text-2xl">User Bio</p>
      </div>
    </div>
  );
};

export default index;
