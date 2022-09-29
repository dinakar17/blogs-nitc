// Todo: Search and Filter the blogs
// https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing
// Todo: Pagination
// Todo: Fetch the blogs from the database

import React, { ChangeEvent, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Pagination from "@material-ui/lab/Pagination";

import { GetServerSideProps, NextPage } from "next";
import { getAllPosts, getFilteredPosts } from "../../api";
import BlogCard, { BlogProps } from "../../components/Card/BlogCard";
import { toast } from "react-toastify";
import Branch from "../../helpers/Options/Branch";
import Semester from "../../helpers/Options/Semester";
import Select from "react-select";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useSWR from "swr";
import SkeletonCard from "../../components/UI/Loader/SkeletonCard";
import SearchInput from "../../components/UI/Search/SearchInput";
import BlogCards from "../../components/Card/BlogCard";

type Props = {
  data: any;
  error: any;
};

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Popular" },
];

const fetcher = (url: string) => getFilteredPosts(url).then((res) => res.data);

const Home: NextPage<Props> = (props) => {
  const { branch, semester, subject } = useSelector(
    (state: RootState) => state.filter
  );
  const router = useRouter();
  let query: string = "";

  // Todo: Fix this issue
  // useEffect(() => {
  //   // clear all query names in the url
  //   // shallow means
  //   router.replace("/blog", undefined, { shallow: true });
  // }, []);

  const { data, error } = props;

  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState({ value: "", label: "" });
  const [shouldFetch, setShouldFetch] = React.useState(false);

  if (error) {
    let errMessage;
    if (error.response) {
      errMessage = error.response.data.message;
    } else errMessage = "Something went wrong, Please reload to view content";

    toast(errMessage, {
      type: "error",
    });

    return null;
  }

  const page = router.query.page || 1;
  const limit = 20;

  const paginationHandler = (event: ChangeEvent<unknown>, page: number) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.toString();

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  // console.log(data);
  const handleSearch = (choice: string) => {
    // if search is not empty then add it to the query
    if (choice === "Search") {
      if (search && router.query.search !== search) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, search },
        });
      } else if (!search && router.query.search) {
        // if search is empty and there is a search query in the url then remove it
        const currentQuery = router.query;
        delete currentQuery.search;
        router.push({
          pathname: router.pathname,
          query: currentQuery,
        });
      }
    }

    if (choice === "Filter") {
      // if branch is not empty then add it to the query
      if (branch.value && router.query.branch !== branch.value) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, branch: branch.value },
        });
      } else if (!branch.value && router.query.branch) {
        // if branch is empty and there is a branch query in the url then remove it
        const currentQuery = router.query;
        delete currentQuery.branch;
        router.push({
          pathname: router.pathname,
          query: currentQuery,
        });
      }
      if (semester.value && router.query.semester !== semester.value) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, semester: semester.value },
        });
      } else if (!semester.value && router.query.semester) {
        // if semester is empty and there is a semester query in the url then remove it
        const currentQuery = router.query;
        delete currentQuery.semester;
        router.push({
          pathname: router.pathname,
          query: currentQuery,
        });
      }
    }

    if (choice === "Sort") {
      // if sort is not empty then add it to the query
      if (sort.value && router.query.sort !== sort.value) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, sort: sort.value },
        });
      } else if (!sort.value && router.query.sort) {
        // if sort is empty and there is a sort query in the url then remove it
        const currentQuery = router.query;
        delete currentQuery.sort;
        router.push({
          pathname: router.pathname,
          query: currentQuery,
        });
      }
    }

    // // if subject is not empty then add it to the query
    // if (subject.value) {
    //   router.push({
    //     pathname: router.pathname,
    //     query: { ...router.query, subject: subject.value },
    //   });
    // } else if (!subject.value && router.query.subject) {
    //   // if subject is empty and there is a subject query in the url then remove it
    //   const currentQuery = router.query;
    //   delete currentQuery.subject;
    //   router.push({
    //     pathname: router.pathname,
    //     query: currentQuery,
    //   });
    // }

    // setShouldFetch(true);
    setShouldFetch(true);
  };

  // https://swr.vercel.app/docs/conditional-fetching
  // if (shouldFetch) {  // Rendered more hooks than during the previous render
  query = `${router.query.search ? `&search=${router.query.search}` : ""}${
    router.query.branch ? `&branch=${router.query.branch}` : ""
  }${router.query.semester ? `&semester=${router.query.semester}` : ""}${
    router.query.sort ? `&sort=${router.query.sort}` : ""
  }`;
  query = query.startsWith("&") ? query.slice(1) : query;

  const conditionToDisplayFilteredData = () => {
    if (
      router.query.search ||
      router.query.branch ||
      router.query.semester ||
      router.query.sort
    ) {
      return true;
    }
    return false;
  };
  const res = useSWR(
    conditionToDisplayFilteredData() && query
      ? `api/v1/blogs/search?${query}`
      : null,
    fetcher
  );

  if (!res.data && conditionToDisplayFilteredData()) {
    return <div>Loading...</div>;
  }

  // if (shouldFetch && !res.data) return <SkeletonCards />;

  // const dataToDisplay = res.data ? res.data : data;
  // console.log(res.data);

  return (
    <div className="w-[90%] mx-auto">
      <Head>
        <title>Blog App</title>
        <meta
          name="description"
          content="All blogs list for blogging application Blog App"
        />
      </Head>

      <SearchInput
        handleSearch={handleSearch}
        setSearch={setSearch}
        search={search}
      />

      {/* Filters here */}
      <div className="w-full flex flex-col md:flex-row items-center my-4 gap-5">
        <Branch />
        <Semester />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          // handle change in branch and semester separately
          onClick={() => handleSearch("Filter")}
        >
          Filter
        </button>
        <Select options={sortOptions} onChange={(e: any) => setSort(e)} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleSearch("Sort")}
        >
          Sort
        </button>
      </div>
      <div>
        {/* Todo: Display number of blogs and also the time */}
        {/* <p>Found {dataToDisplay.length} blogs</p> */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Is && data required? */}
          {!conditionToDisplayFilteredData() && data && (
            <BlogCards data={data} />
          )}
          {conditionToDisplayFilteredData() && <BlogCards data={res.data} />}
        </div>
        <div style={{ alignSelf: "center", marginTop: "3rem" }}>
          <Pagination
           className="flex justify-center"
            count={
              res.data
                ? Math.ceil(res.data.totalBlogs / limit)
                : Math.ceil(data.totalBlogs / limit)
            }
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
    // console.log(res);
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
