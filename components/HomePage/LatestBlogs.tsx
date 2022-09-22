import React from "react";
import BlogCard, { BlogProps } from "../Card/BlogCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1
  }
};

const LatestBlogs = ({data}) => {
  return (
    // render 10 blog
    <section className="min-h-screen flex flex-col gap-10 justify-center items-center"> 
      <h1 className="text-5xl font-semibold">Latest Blogs</h1>
      <Carousel
       /*
          swipeable={false}
          draggable={false}
          */
          
          responsive={responsive}
          ssr
          partialVisbile={false}
          infinite={false}
          // beforeChange={() => this.setState({ isMoving: true })}
          // afterChange={() => this.setState({ isMoving: false })}
          containerClass="first-carousel-container container"
          itemClass="first-carousel-item py-5"
          // show 4 cards at a time
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          >
          {data.map((blog: BlogProps) => (
            <BlogCard key={blog._id} data={blog} />
          ))}
      </Carousel>
    </section>
  );
};

export default LatestBlogs;
