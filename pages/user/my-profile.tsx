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
import Image from "next/image";
import { contentfulLoader } from "../../helpers/ImageURL/contentFulLoader";

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
    let errMessage;
    if (error) {
      if (error.response.data) {
        errMessage = error.response.data.message;
      } else errMessage = "Something went wrong, Please try again later";
    }
    toast.error(errMessage);
  }, [error]);

  // Todo: Change return type to skeleton loader
  if (error) return null;

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
        <div className="grid md:grid-cols-2 lg:w-[60%] mx-auto rounded-lg shadow-lg gap-10 my-10 overflow-hidden">
          {/* Note that you cannot change the height of children inside aspect-w-16 rather you can adjust the aspect ratio height and width my changing width of the parent  */}
          <div className="lg:aspect-w-16 lg:aspect-h-12 md:aspect-w-1 md:aspect-h-1 aspect-w-1 aspect-h-1 ">
            <Image
              src={
                data.data.user.photo
                  ? data.data.user.photo
                  : "/static/default-avatar.png"
              }
              loader={contentfulLoader}
              layout="fill"
              objectFit="cover"
              alt={data.data.user.name}
            />
          </div>
          <div className="flex flex-col h-full w-full justify-center gap-3 px-5 md:px-0 py-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg text-gray-500 dark:text-gray-300  font-semibold">
                Username
              </h1>
              <h1 className="text-lg font-logo">{data.data.user.name}</h1>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg text-gray-500 dark:text-gray-300 font-semibold">
                Email
              </h2>
              <p className="text-base break-all">{data.data.user.email}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-lg text-gray-500 dark:text-gray-300 font-semibold">
                About Me
              </p>
              <p
                className={`${
                  data.data.user.bio
                    ? "text-base"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                {data.data.user.bio
                  ? data.data.user.bio
                  : "You haven't added any bio yet"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="text-4xl font-semibold text-center mt-10">My Blogs</h2>
          <hr />
          {data.data.blogs.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="flex flex-col gap-2 items-center lg:w-[30%] mx-auto">
              <div className="aspect-w-16 aspect-h-14 w-full">
                <Image
                  src="/static/no-blogs.png"
                  layout="fill"
                  objectFit="cover"
                  alt="No blogs"
                />
              </div>
              <h4 className="font-medium">
                Looks like you haven't written any blogs yet.
              </h4>
              <p className="text-sm">
                Now is the perfect time for you to start sharing something
                amazing with the community.
              </p>
              <button
                className="my-2 bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue/40 active:opacity-[0.85] font-medium text-base capitalize py-2 px-4 rounded-md"
                onClick={() => router.push("/blog/create")}
              >
                Write your first blog
              </button>
            </div>
          )}
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
