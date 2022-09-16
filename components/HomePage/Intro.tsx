import Image from "next/image";
import React from "react";

const Intro = () => {
  return (
    <section className="min-h-screen grid">
    {/* // Two equi-spaced columns using grid */}
    <div className="grid grid-cols-2 items-center justify-center my-auto">
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
      </div>
    </div>
  </section>
  );
};

export default Intro;
