import { useRouter } from "next/router";
import NextProgress from "next-progress";
import React, { useEffect } from "react";
import Fade from "@mui/material/Fade";
import { toast } from "react-toastify";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

type Props = {
  children: React.ReactNode;
  noLayoutRoutes: string[];
};

const Layout = ({ children, noLayoutRoutes }: Props) => {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("createPost", "/blog/create");
  }, []);

  // Todo: check wether the token is expired or not
  // const {token} = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     // send a request to the server to check wether the token is expired or not
  //     const res = await fetch("/api/auth/checkToken", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token }),
  //     });
  //     const data = await res.json();
  //     if (data.error) {
  //       // if the token is expired, then redirect to the login page
  //       router.push("/auth/login");
  //       toast.error(data.error, {
  //         position: "top-center",
  //       });
  //     }
  //   };
  //   if (token) {
  //     checkToken();
  //   }
  // }, [token, router]);

  useEffect(() => {
    if (localStorage.getItem("createPost") === router.pathname) {
      localStorage.removeItem("createPost");
      toast(
        "Please wait till the editor is loaded. If it takes too long then refresh the page.",
        {
          type: "info",
          autoClose: 3000,
          position: "bottom-left",
          toastId: "editor",
          hideProgressBar: true,
        }
      );
    }
  }, [router.pathname]);

  const noLayout = noLayoutRoutes.indexOf(router.pathname) !== -1;

  return (
    <>
      <Fade appear={true} in={true} timeout={1000}>
        <div className="font-default dark:bg-[#1F2028] dark:text-gray-100">
          {noLayout ? (
            <div>{children}</div>
          ) : (
            <>
              <NextProgress
                delay={200}
                color="#29D"
                options={{ showSpinner: false }}
              />
              <Header />
              <div>{children}</div>
              <Footer />
            </>
          )}
        </div>
      </Fade>
    </>
  );
};

export default Layout;
