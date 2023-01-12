import type { GetServerSideProps, NextPage } from "next";
import * as api from "../api/index";
import { Intro, LatestBlogs } from "../components";
import { PageSEO } from "../components/SEO/SEO";
import siteMetadata from "../data/siteMetadata";

// Note: res.data === {data: [array of posts], currentBlogsCount: number}

type Props = {
  data: {
    data: any[];
    success: string;
  };
  error: string;
};

const Home: NextPage<Props> = ({ data, error }) => {
  // console.log(data); // Here data === res.data
  const metaData = {
    title: siteMetadata.title,
    description: siteMetadata.description,
    tags: ["NITC", "NITC Blogs", "NITC Notes", "NITC Notes and Blogs"],
    featuredImage: siteMetadata.socialBanner,
    slug: '',
  }
  return (
    <>
    <PageSEO {...metaData} />
    {/* // Todo: w-[80%] mx-auto repetitive code */}
    <div className="w-[90%] mx-auto">
      <Intro data={data} error={error} />
      <LatestBlogs />
    </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await api.getRandomPosts();
    // console.log(res.data);
    return {
      props: {
        data: res.data,
      },
    };
  } catch (err) {
    // console.log(err);
    return {
      props: {
        error: "Unable to display posts at the moment. Please try again later",
      },
    };
  }
};

export default Home;
