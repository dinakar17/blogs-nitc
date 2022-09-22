import { useRouter } from "next/router";
import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { AnimatePresence, motion } from "framer-motion";

// Type of children
type Props = {
  children: React.ReactNode;
  noLayoutRoutes: string[];
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  collapsed: { opacity: 0 },
};

const Layout = ({ children, noLayoutRoutes }: Props) => {
  const router = useRouter();
  const noLayout = noLayoutRoutes.indexOf(router.pathname) !== -1;

  if (noLayout) {
    return <div className="font-default">{children}</div>;
  }

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="font-default"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="collapsed"
        >
          <Header />
          <div>{children}</div>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Layout;
