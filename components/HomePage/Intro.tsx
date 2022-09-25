import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import TextTransition, { presets } from "react-text-transition";
import Link from "next/link";

const TEXTS = ["Share", "Grow"];

const Intro = () => {
  const { authData } = useSelector((state: RootState) => state.user);

  const [index, setIndex] = React.useState(0);

  const [text] = useTypewriter({
    words: ["Experience", "Knowledge", "Wisdom 😉"],
    delaySpeed: 1000,
    loop: 0,
    onLoopDone: () => console.log(`loop completed after 3 runs.`),
  });

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <section className="min-h-screen grid">
      {/* // Two equi-spaced columns using grid */}
      <div className="grid grid-cols-2 items-center justify-center my-auto">
        <div className="flex flex-col justify-center gap-5">
          <p className="text-xl font-bold uppercase text-gray-800">
            Welcome {authData ? authData.name : <span>to NITC world</span>},
            here you can
          </p>
          <h1 className="text-8xl font-bold">
            <TextTransition springConfig={presets.wobbly}>
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
            your
          </h1>
          <h1 className="text-8xl font-bold">
            {text} <Cursor />
          </h1>
          <Link href="/blog">
            <button
              type="button"
              className="mr-auto text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center mb-2 "
            >
              See all posts
            </button>
          </Link>
        </div>
        <div>
          <Image src="/static/hero.jpg" width={500} height={500} />
        </div>
      </div>
    </section>
  );
};

export default Intro;
