import React from "react";
import { BlogCard, BlogProps } from "../Card/BlogCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import useSWR from "swr";
import { getLatestPosts } from "../../api";
import SkeletonCard from "../UI/Loader/SkeletonCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const fetcher = (url: string) => getLatestPosts(url).then((res) => res.data);

const LatestBlogs = () => {
  // make the api call only when the component is in the viewport
  
    
  // console.log(data);
  const { data, error } = useSWR("api/v1/blogs/latest", fetcher);
  return (
    <>
      <section className="min-h-screen flex flex-col gap-10 items-center">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center lg:text-left">Latest Blogs</h1>
        {error ? (
          <div>Something went wrong</div>
        ) : !data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <SkeletonCard key={i} />
              ))}
          </div>
        ) : (
          <Carousel
            /*
          swipeable={false}
          draggable={false}
          */
            autoPlay
            responsive={responsive}
            ssr
            draggable
            infinite
            partialVisible
            // beforeChange={() => this.setState({ isMoving: true })}
            // afterChange={() => this.setState({ isMoving: false })}
            containerClass="first-carousel-container container"
            itemClass="first-carousel-item py-5"
            // show 4 cards at a time
            removeArrowOnDeviceType={["tablet", "mobile"]}
            showDots
            // deviceType={this.props.deviceType}
          >
            {data.data.map((blog: BlogProps) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
            {/* <BlogCards data={data} /> */}
          </Carousel>
        )}
      </section>
    </>
  );
};

export default LatestBlogs;
