import Image from "next/image";
import React from "react";
import { PageSEO } from "../components/SEO/SEO";
import LightBulb from "../components/svgs/light-bulb.svg";
import siteMetadata from "../data/siteMetadata";

const issues = () => {
  const metaData = {
    title: "Issues | NITC News and Blogs",
    description:
      "Found/Facing any issues? We are extremely sorry for the inconvenience caused. Please report the issue by either emailing us at Gmail or else you can also share your issues on by joining our Discord server.",
    tags: ["NITC", "NITC Blogs", "NITC Notes", "NITC Notes and Blogs"],
    featuredImage: siteMetadata.socialBanner,
    slug: "",
  };
  return (
    <div className="prose prose-indigo max-w-none prose-sm md:prose-base w-[90%] mx-auto md:w-[80%] dark:prose-invert">
      <PageSEO {...metaData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="self-center order-last md:order-none">
          <h2>
            Found/Facing any issues? We are extremely sorry for the
            inconvenience caused. Please report the issue by either emailing us
            at <a href={`mailto:${siteMetadata.email}`}>Gmail</a>
          </h2>
          <h2>
            Or else you can also share your issues on by joining our Discord
            server.
          </h2>
          <button className="not-prose bg-[#7289da] hover:bg-[#5f73bc] text-white font-bold py-2 px-4 rounded">
            <a
              href="https://discord.gg/5cXWmKGsSF"
              target="_blank"
              rel="noreferrer"
              className=""
            >
              <i className="fa-brands fa-discord mr-2"></i>
              Join Discord
            </a>
          </button>
          <p className="text-blue-700 font-medium">
            We'll try our best to fix the issue as soon as possible. Thank you
            for your patience.
          </p>
        </div>
        <div className="aspect-w-3 aspect-h-3 overflow-hidden">
          <Image
            src="/static/issues1.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-12 mt-12">
        <div className="aspect-w-3 aspect-h-3 overflow-hidden">
          <Image
            src="/static/issues2.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-md shadow-md"
          />
        </div>
        <div className="self-center flex flex-col gap-2">
          <div className="relative flex justify-center items-center">
            <Image src={LightBulb} alt="Light Bulb" width={100} height={100} />
          </div>
          <h2 className="text-center">Open to Ideas and Feature Requests</h2>
          <h4>
            We are open to any new ideas or feature requests. So if you have any
            ideas (literally any) that could potentially improve the way website
            works, please feel free to share it with us through our Discord
            server.
          </h4>
          <button className="not-prose mx-auto bg-[#7289da] hover:bg-[#5f73bc] text-white font-bold py-2 px-4 rounded">
            <a
              href="https://discord.gg/5cXWmKGsSF"
              target="_blank"
              rel="noreferrer"
              className=""
            >
              <i className="fa-brands fa-discord mr-2"></i>
              Join Discord
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default issues;
