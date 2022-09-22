// Todo: Search and Filter the blogs
// Todo: Pagination
// Todo: Fetch the blogs from the database

import React, { ChangeEvent } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Pagination from "@material-ui/lab/Pagination";

import Spinner from "../../components/UI/Spinner";
import { GetServerSideProps, NextPage } from "next";
import { getAllPosts } from "../../api";
import BlogCard, { BlogProps } from "../../components/Card/BlogCard";

// const fetcher = (url) => axios.get(url).then((res) => res.data);

type Props = {
  data: any;
  error: any;
};

const Home: NextPage<Props> = (props) => {
  const router = useRouter();
  const { data, error } = props;
  if (error) {
    let errMessage;
    if (error.response) {
      errMessage = error.response.data.message;
    } else errMessage = "Something went wrong, Please reload to view content";

    // enqueueSnackbar(errMessage, { variant: "error" });
    return null;
  }

  const page = router.query.page || 1;
  const limit = 20;

  // const { data, error } = useSWR(
  //   `api/v1/blogs?limit=${limit}&fields=title,description,featuredImage,user,slug,createdAt,updatedAt&page=${page}`,
  //   fetcher
  // );

  if (!data) return <Spinner />;

  const paginationHandler = (event: ChangeEvent<unknown>, page: number) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.toString();

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  console.log(data);
  return (
    <div className="w-[90%] mx-auto">
      <Head>
        <title>Blog App</title>
        <meta
          name="description"
          content="All blogs list for blogging application Blog App"
        />
      </Head>
      <div className="w-full">
        <input type="text" placeholder="Search" className="w-full p-2 m-4 focus:outline-none border border-gray-300 rounded-md" /> 
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* <BlogCards data={data.data} /> */}
          {data.data.map((blog: BlogProps) => (
            <BlogCard key={blog._id} data={blog} />
          ))}
        </div>
        <div style={{ alignSelf: "center", marginTop: "3rem" }}>
          <Pagination
            count={Math.ceil(data.totalResults / limit)}
            page={Number(page) * 1}
            onChange={paginationHandler}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page || 1;
  const query = `page=${page}`;
  try {
    const res = await getAllPosts(query);
    console.log(res);
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error: any) {
    if (error.response)
      return { props: { error: error.response.data.message } };
    else
      return {
        props: { error: "Something went wrong. Please reload to view content" },
      };
  }
};

export default Home;
