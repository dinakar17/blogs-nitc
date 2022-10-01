import type { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import * as api from "../api/index";
import { Intro, LatestBlogs } from "../components";

// Note: res.data === {data: [array of posts], currentBlogsCount: number}

type Props = {
  data: {
    data: any[];
    success: string;
  },
  error: string;
}

const Home: NextPage<Props> = ({data, error}) => {
  // console.log(data); // Here data === res.data

  // if (error) return <div>Something went wrong</div>;
  // if (!data) return <div>Loading...</div>;
  return (
    // TOdo: w-[80%] mx-auto repetitive code
    <div className="w-[90%] mx-auto">
      <Intro data={data} error={error} />
      <LatestBlogs />
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await api.getRandomPosts();
    console.log(res.data);
    return {
      props: {
        data: res.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: null,
      },
    };
  }
};

export default Home;