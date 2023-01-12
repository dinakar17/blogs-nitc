// Todo: Only show the necessary field in the query while filtering through branch, semester, subject
// Todo: Search by description and tags
// Todo: Add popular option as another sorting option
// https://stackoverflow.com/questions/42217121/how-to-start-search-only-when-user-stops-typing

import React, { ChangeEvent, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";
import { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import Select from "react-select";
import useSWR from "swr";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import { getAllPosts, getFilteredPosts } from "../../api";
import Branch from "../../helpers/Options/Branch";
import Semester from "../../helpers/Options/Semester";
import SearchInput from "../../components/UI/Search/SearchInput";
import BlogCards from "../../components/Card/BlogCard";
import { MagnifyingGlassLoader } from "../../components/UI/Loader/Loader";
import Subject from "../../helpers/Options/Subject";
import NoSearchResults from "../../components/UI/Search/NoSearchResults";
import { resetFilters } from "../../store/StatesContainer/filters/FilterSlice";
import SkeletonCard from "../../components/UI/Loader/SkeletonCard";
import siteMetadata from "../../data/siteMetadata";
import { PageSEO } from "../../components/SEO/SEO";

type Props = {
  data: any;
  error: any;
};

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  // { value: "popular", label: "Popular" }, Todo: Add popular filter
];

const fetcher = (url: string) => getFilteredPosts(url).then((res) => res.data);

const Home: NextPage<Props> = (props) => {
  const router = useRouter();

  const { branch, semester, subject } = useSelector(
    (state: RootState) => state.filter
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  let query: string = "";

  const { data, error } = props;

  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState({ value: "", label: "" });
  const [showLoader, setShowLoader] = React.useState(false);

  const page = router.query.page || 1;
  // Todo: don't mention limit on the frontend
  const limit = 16;

  const paginationHandler = (event: ChangeEvent<unknown>, page: number) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.toString();

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

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
      if (branch.value || semester.value || subject.value) {
        // Todo: Add the filter query
        router.push({
          pathname: router.pathname,
          query: {
            ...router.query,
            branch: branch.value,
            semester: semester.value,
            subject: subject.value,
          },
        });
      } else {
        const currentQuery = router.query;
        delete currentQuery.branch;
        delete currentQuery.semester;
        delete currentQuery.subject;
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
  };

  // https://swr.vercel.app/docs/conditional-fetching
  // if (shouldFetch) {  // Rendered more hooks than during the previous render
  query = `${router.query.search ? `&search=${router.query.search}` : ""}${
    router.query.branch ? `&branch=${router.query.branch}` : ""
  }${router.query.semester ? `&semester=${router.query.semester}` : ""}${
    router.query.sort ? `&sort=${router.query.sort}` : ""
  }${router.query.subject ? `&subject=${router.query.subject}` : ""}`;
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
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleReset = () => {
    setSearch("");
    delete router.query.search;
    setSort({ value: "", label: "" });
    dispatch(resetFilters());
    const currentQuery = router.query;
    delete currentQuery.sort;
    delete currentQuery.branch;
    delete currentQuery.semester;
    delete currentQuery.subject;

    router.push({
      pathname: router.pathname,
      query: currentQuery,
    });
  };

  useEffect(() => {
    if (error || res.error) {
      toast(
        "Some went wrong while displaying the blogs. Please try again later or try refreshing the page.",
        {
          type: "error",
          autoClose: false,
          position: "bottom-right",
          toastId: "blogs",
        }
      );
    }
  }, [error, res.error]);

  // Error handling
  if (error || res.error) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-[90%] mx-auto">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <SkeletonCard key={i} />
          ))}
      </div>
    );
  }

  useEffect(() => {
    // https://stackoverflow.com/questions/52754121/how-to-return-jsx-after-settimeout
    // Todo: Loader is not getting delayed. Fix it
    if (!res.data) {
      setTimeout(() => {
        setShowLoader(true);
      }, 1000);
    }
  }, [res.isValidating]);

  const metaData = {
    title: "NITC Notes and Blogs",
    description: siteMetadata.description,
    tags: ["NITC", "NITC Blogs", "NITC Notes", "NITC Notes and Blogs"],
    featuredImage: siteMetadata.socialBanner,
    slug: "",
  };

  return (
    <div className="min-h-screen w-[90%] mx-auto">
      <PageSEO {...metaData} />

      <SearchInput
        handleSearch={handleSearch}
        setSearch={setSearch}
        search={search}
      />

      {/* Filters here */}
      <div className="w-full flex flex-col md:flex-row items-center my-4 gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <Branch />
          <Semester />
          <Subject branch={branch.value} semester={semester.value} />

          <button
            className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue/40 active:opacity-[0.85] font-medium text-base capitalize py-2 px-4 rounded-md"
            // handle change in branch and semester separately
            onClick={() => handleSearch("Filter")}
          >
            Filter
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            className=""
            value={sort}
            options={sortOptions}
            onChange={(e: any) => setSort(e)}
          />
          <button
            className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue/40 active:opacity-[0.85] font-medium text-base capitalize py-2 px-4 rounded-md"
            onClick={() => handleSearch("Sort")}
          >
            Sort
          </button>
          <button
            onClick={handleReset}
            className="bg-gradient-to-r from-red-600 to-red-400 text-white font-medium text-base capitalize py-2 px-4 rounded-md"
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div>
        {/* Todo: Display number of blogs and also the time */}
        {/* <p>Found {dataToDisplay.length} blogs</p> */}
        {/* Is && data required? */}
        {!conditionToDisplayFilteredData() &&
          data &&
          (data.data.length === 0 ? (
            <div className="flex justify-center min-h-screen items-center">
              <p className="text-2xl font-medium text-gray-500">
                Oops, No blogs are found to display!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
              <BlogCards data={data} />
            </div>
          ))}
        {conditionToDisplayFilteredData() &&
          (res.data ? (
            res.data.data.length === 0 ? (
              <NoSearchResults />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
                <BlogCards data={res.data} />
              </div>
            )
          ) : (
            showLoader && <MagnifyingGlassLoader />
          ))}
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
    /*
    res.data === {
      data: blogs,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
      totalBlogs: total,
      currentBlogsCount,
    }
    Same format for search results
    */
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

// Todo: Carousel for tags (performance issue?)
// Todo: No blogs found UI design
// Todo: BlogCards are not responsive in tablet view (max-width: 768px)
// Todo: Add Input, Filter, Sort UI in error handling (optional)
// Todo: Set red color for heart only if it is liked by the user
// Todo: Add random colors to the tags
// Todo: BlurDataUrl for images
// Todo: Found "number" results in "time" logic
// https://stackoverflow.com/questions/9040161/mongo-order-by-length-of-array
