import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { toast } from "react-toastify";
import Fade from "@mui/material/Fade";

type Props = {
  children: React.ReactNode;
  noLayoutRoutes: string[];
};

const Layout = ({ children, noLayoutRoutes }: Props) => {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("createPost", "/blog/create");
  }, []);

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
