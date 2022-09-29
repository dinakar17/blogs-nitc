import { useContext, useState, useEffect, ChangeEvent } from "react";
import Head from "next/head";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loader from "../../components/UI/Loader/Loader";
import { getProfile } from "../../api";
import { toast } from "react-toastify";
import {BlogCard, BlogProps } from "../../components/Card/BlogCard";
import { Pagination } from "@material-ui/lab";
import { useRouter } from "next/router";

const fetchWithToken = (url: string, token: string) =>
  getProfile(url, token).then((res) => res.data);

const MyProfile = () => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.user);
  const page = router.query.page || 1;

  const { data, error } = useSWR(
    token ? [`api/v1/users/profile?page=${page}`, token] : null,
    fetchWithToken
  );

  if (error) {
    let errMessage;
    if (error.response) {
      errMessage = error.response.data.message;
    } else errMessage = "Something went wrong, Please try again later";

    toast(errMessage, {
      type: "error",
    });
    return null;
  }

  if (!data) return <Loader />;
  // Todo: Deal when there are no blogs

  const paginationHandler = (event: ChangeEvent<unknown>, page: number) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.page = page.toString();

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <>
      <Head>
        <title>My Profile</title>
        <meta name="description" content="My Profile page for Blog App" />
      </Head>
      <div className="w-[80%] mx-auto min-h-screen">
        <h1>My Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-full overflow-hidden w-32 h-32">
            <img
              src={data.data.user.photo}
              alt="user"
              className="object-cover w-full"
            />
          </div>
          <div>
            <p>{data.data.user.name}</p>
            <p>{data.data.user.email}</p>
            <p>{data.data.user.bio}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-center">My Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.data.blogs.map((blog: BlogProps) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {/* Pagination */}
          <Pagination
            count={Math.ceil(data.data.totalBlogs / 5)}
            page={Number(page)}
            onChange={paginationHandler}
          />
        </div>
      </div>
    </>
  );
};

export default MyProfile;

// Todo: Handle authentication inside getServerSideProps
// https://stackoverflow.com/questions/63860373/how-to-use-cookie-inside-getserversideprops-method-in-next-js
// https://stackoverflow.com/questions/49920234/how-to-implement-authentication-in-next-js
// https://javascript.plainenglish.io/next-js-using-cookies-in-getserversideprops-89c03a216b0b
// const getServersideProps: GetServerSideProps = async (context) => {
//   // get token from cookie
//   const token = getCookie('token', context.req);
