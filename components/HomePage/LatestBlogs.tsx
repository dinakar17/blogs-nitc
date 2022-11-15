import React, { useEffect } from "react";
import { BlogCard, BlogProps } from "../Card/BlogCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useSWR from "swr";
import { getLatestPosts } from "../../api";
import SkeletonCard from "../UI/Loader/SkeletonCard";
import { toast } from "react-toastify";

const fetcher = (url: string) => getLatestPosts(url).then((res) => res.data);

const LatestBlogs = () => {
  // make the api call only when the component is in the viewport
  const { data, error } = useSWR("api/v1/blogs/latest", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
  });

  // useEffect(() => {
  //   if (error) {
  //     toast(
  //       "Something went wrong while fetching the latest blogs. Please try again later.",
  //       {
  //         type: "error",
  //         autoClose: false,
  //         position: "bottom-right",
  //         // https://stackoverflow.com/questions/62578112/react-toastify-showing-multiple-toast
  //         toastId: "latestBlogs",
  //       }
  //     );
  //   }
  // }, [error]);

  if (data) {
    toast.dismiss("intro");
  }

  return (
    <>
      <section className="min-h-screen flex flex-col  md:gap-10 items-center">
        <h1 className="text-3xl md:text-5xl font-semibold text-center lg:text-left">
          Latest Blogs
        </h1>
        {error ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : !data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : (
          data.data.length > 0 && (
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              // infinite
              keyBoardControl
              minimumTouchDrag={80}
              partialVisible
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 4,
                  partialVisibilityGutter: 15,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 40,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
              removeArrowOnDeviceType={["tablet", "mobile"]}
              itemClass="first-carousel-item py-5"
            >
              {data.data.map((blog: BlogProps) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}

              {/* <BlogCards data={data} /> */}
            </Carousel>
          )
        )}
      </section>
    </>
  );
};

export default LatestBlogs;
