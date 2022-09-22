import type { NextPage } from "next";
import useSWR from "swr";
import { getLatestPosts } from "../api";
import { Intro, LatestBlogs } from "../components";
// dynamic import

const fetcher = (url: string) => getLatestPosts(url).then((res) => res.data);

const Home: NextPage = () => {
  const { data, error } = useSWR("api/v1/blogs/latest", fetcher);

  console.log(data);

  // if (error) return <div>Something went wrong</div>;
  // if (!data) return <div>Loading...</div>;
  return (
    // TOdo: w-[80%] mx-auto repetitive code
    <div className="w-[90%] mx-auto">
      <Intro />
      {error ? (
        <div>Something went wrong</div>
      ) : !data ? (
        <div>Loading</div>
      ) : (
        <LatestBlogs data={data.data} />
      )}
    </div>
  );
};

export default Home;
