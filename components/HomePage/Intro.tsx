import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import TextTransition, { presets } from "react-text-transition";
import Link from "next/link";
import Carousel from "react-multi-carousel";

const TEXTS = ["Share", "Grow"];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

type Props = {
  data: {
    data: any[];
    success: string;
  };
  error: string;
};

const Intro = ({ data, error }: Props) => {
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
    <section className="grid">
      {/* Todo: replace mt-24 mb-20*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:mt-20 mb-20">
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <p className="text-sm md:text-xl font-bold uppercase text-gray-800">
            Welcome {authData ? authData.name : <span>to NITC world</span>},
            here you can
          </p>
          <h1 className="text-5xl md:text-8xl font-bold">
            <TextTransition
              springConfig={presets.wobbly}
              inline
              className="whitespace-nowrap"
            >
              {TEXTS[index % TEXTS.length]}
            </TextTransition>
          </h1>
          <h1 className="text-5xl md:text-8xl font-bold">your</h1>
          <h1 className="text-5xl md:text-8xl font-bold h-16">{text}</h1>
          <Link href="/blog">
            <button
              type="button"
              className="lg:mr-auto mx-4 lg:mx-0 mb-5 md:mt-10 md:text-xl text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 "
            >
              See all posts
            </button>
          </Link>
        </div>
        {/* justify-self-center is hiding the images. Why? */}
        <div className="">
          <Carousel
            ssr
            additionalTransfrom={0}
            arrows
            autoPlay
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsive}
            rewind
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={true}
            sliderClass=""
            swipeable
          >
            {error ? (
              <div className="aspect-w-16 aspect-h-9 animate-pulse">
                <div className="flex justify-center items-center mb-4 bg-gray-300 rounded-lg dark:bg-gray-700">
                  <svg
                    className="w-12 h-12 text-gray-200 dark:text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              </div>
            ) : (
              data.data.map((post) => <CardLayout key={post._id} post={post} />)
            )}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

type CardProps = {
  post: {
    _id: string;
    title: string;
    featuredImage: string;
    slug: string;
    user: Array<{
      name: string;
      photo: string;
    }>;
  };
};

export const CardLayout = ({ post }: CardProps) => {
  return (
    <div className="relative">
      <div className="aspect-w-10 aspect-h-9 lg:aspect-w-16 lg:aspect-h-9">
        <img
          src={post.featuredImage}
          className="object-cover shadow-lg rounded-lg"
          alt=""
        />
      </div>
      <div className="absolute bottom-0 p-4 flex flex-col gap-2">
        <Link href={`/blog/${post.slug}`}>
          <h2 className="cursor-pointer text-3xl font-bold text-white">
            {post.title}
          </h2>
        </Link>
        <div className="flex items-center gap-2">
          <div>
            <Image
              src={post.user[0].photo}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
          <div className="text-white">
            <p>{post.user[0].name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
