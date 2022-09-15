import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

// Type of children
type Props = {
  children: React.ReactNode;
  noLayoutRoutes: string[];
};

const Layout = ({ children, noLayoutRoutes }: Props) => {
  const router = useRouter();
  const noLayout = noLayoutRoutes.indexOf(router.pathname) !== -1;

  if (noLayout) {
    return <div className="font-default">{children}</div>;
  }

  return (
    <>
      <div className="font-default">
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
