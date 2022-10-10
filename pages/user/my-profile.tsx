import { useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";

import { RootState } from "../../store/store";
import Loader from "../../components/UI/Loader/Loader";
import { getProfile } from "../../api";
import { BlogCard, BlogProps } from "../../components/Card/BlogCard";

const fetchWithToken = (url: string, token: string) =>
  getProfile(url, token).then((res) => res.data);

const MyProfile = () => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.user);
  const page = router.query.page || 1;

  const { data, error } = useSWR(
    token ? [`api/v1/users/profile?page=${page}`, token] : null,
    fetchWithToken,
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (error) {
      let errMessage;
      if (error.response) {
        errMessage = error.response?.data?.message;
      } else errMessage = "Something went wrong, Please try again later";

      toast(errMessage, {
        type: "error",
      });
    }
  }, [error]);

  // if (error) return <div>Something went wrong</div>;
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
      <div className="w-[90%] mx-auto min-h-screen">
        {/* <h1>My Profile</h1> */}
        <div className="grid md:grid-cols-2 lg:w-[60%] mx-auto rounded-lg shadow-lg gap-10 my-10">
          {/* Note that you cannot change the height of children inside aspect-w-16 rather you can adjust the aspect ratio height and width my changing width of the parent  */}
          <div className="lg:aspect-w-16 lg:aspect-h-12 md:aspect-w-1 md:aspect-h-1 aspect-w-16 aspect-h-9">
            <img
              src={data.data.user.photo}
              className="object-cover rounded-l-lg"
            />
          </div>
          <div className="flex flex-col h-full w-full justify-center gap-3 px-5 md:px-0 py-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-semibold">Username</h1>
            <h1 className="text-lg font-logo">{data.data.user.name}</h1>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold">Email</h2>
              <p className="text-base break-words">{data.data.user.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold">About Me</p>
              <p className="text-sm">{data.data.user.bio}</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-4xl font-semibold text-center mt-10">My Blogs</h2>
          <hr />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
            {data.data.blogs.map((blog: BlogProps) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          <Pagination
            count={Math.ceil(data.data.totalBlogs / 8)}
            page={Number(page)}
            style={{ alignSelf: "center", marginTop: "1rem" }}
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

// Todo: During screen size of 1280px, there is no gap between blogCards
// Todo: Uploading less dimensioned image adds "px" to the image and content