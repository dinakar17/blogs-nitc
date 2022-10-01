// Todo: Add transition between dark and light mode

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { logOut } from "../../../../store/StatesContainer/auth/AuthSlice";

import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoCreateOutline, IoLogOutOutline } from "react-icons/io5";

import { AnimatePresence, motion } from "framer-motion";
import DarkModeToggle from "react-dark-mode-toggle";
import { MdCollectionsBookmark } from "react-icons/md";
import Image from "next/image";

import styles from "styles/MobileMenu.module.css";

const ContainerVariants = {
  hidden: { scale: 0 },
  // staggerChildren means that the children will animate one after the other
  // "beforeChildren" to finish this transition before starting children transitions
  visible: {
    // opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
      duration: 0.3,
    },
    scale: 1,
  },
  collapsed: {
    scale: 0,
    transition: {
      duration: 0.1,
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  collapsed: { opacity: 0, y: 10, transition: { duration: 0.2 } },
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Header = () => {
  const [mounted, setMounted] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { authData } = user;
  // console.log(authData);

  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const handleClick = () => {
    setIsDarkMode((s) => !s);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    {
      name: "Blogs",
      href: "/blog",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];

  useEffect(() => {
    setMounted(false);
  }, [router]);

  const handleLogOut = () => {
    console.log("Log out");
    // clear the presist state
    // persistor.purge();
    dispatch(logOut());
    // dispatch(logOut());
    router.push("/auth/login");
  };
  return (
    // Note: w-[80%] mx-auto is a Tailwind class that sets the width to 80% and centers the element and this is common practice for most websites.
    <motion.header
      className="flex items-center py-4 font-medium text-gray-900 dark:text-gray-100"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {/* Todo: remove w-[%] with another alternative */}
      <nav className="w-full md:w-[80%] mx-auto flex items-center justify-between">
        <div className="cursor-pointer">
          <Link href="/">
            <Image
              src="/static/logo-for-nitc.png"
              alt="logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <ul className="text-gray-600 text-lg md:flex gap-5 items-center hidden justify-center tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <a
                  className={`p-1 rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-800 ${
                    router.pathname === link.href ? "underline" : ""
                  }`}
                >
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-5">
          {authData ? (
            <div className="invisible md:visible relative group">
              <motion.div
                className="cursor-pointer"
                // variants are used to define the start and end states of an animation
                // initial is the initial state of the animation or the state of the animation when the component is first rendered
                initial={{ opacity: 0 }}
                // animate is the state of the animation when the component is rendered
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                // animate y after scale animation is complete
                whileTap={{ scale: 0.9 }}
                onClick={() => setMounted((s) => !s)}
              >
                <img
                  src={authData.photo}
                  alt="profile"
                  className="w-10 h-10 rounded-full cursor-pointer block m-auto"
                />
              </motion.div>
              <AnimatePresence>
                {mounted && (
                  <motion.ul
                    className="absolute bg-white shadow-lg rounded-lg p-4 w-44 top-12 -right-16 flex flex-col gap-5 z-20"
                    variants={ContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="collapsed"
                    onClick={() => setMounted((s) => !s)}
                  >
                    <motion.li
                      variants={itemVariants}
                      className="cursor-pointer"
                    >
                      <Link href="/blog/create">
                        <div className="flex items-center gap-2">
                          <IoCreateOutline className="w-5 h-5 text-gray-500" />
                          <a>Write a Blog</a>
                        </div>
                      </Link>
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      className="cursor-pointer"
                    >
                      <Link href="/user/my-profile">
                        <div className="flex items-center gap-2">
                          <MdCollectionsBookmark className="w-5 h-5 text-gray-500" />
                          <a>My Blogs</a>
                        </div>
                      </Link>
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      className="cursor-pointer"
                    >
                      <Link href="/user/edit-profile">
                        <div className="flex items-center gap-2">
                          <CgProfile className="w-5 h-5 text-gray-500" />
                          <a>Edit Profile</a>
                        </div>
                      </Link>
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <IoLogOutOutline className="w-5 h-5 text-gray-500" />
                        <button onClick={handleLogOut}>Log Out</button>
                      </div>
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
              {/* Note: () => handleLogOut won't invoke handleLogOut */}
            </div>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </button>
          )}
          <div className="flex justify-center items-center mr-20 md:mr-0">
            <DarkModeToggle
              onChange={handleClick}
              checked={isDarkMode}
              speed={3}
              size={50}
            />
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className="md:invisible visible">
        <label
          htmlFor="active"
          className={`absolute z-[10000] right-5 top-10 h-12 w-12 text-center leading-[50px] rounded-full text-xl text-white cursor-pointer transition-all ${
            mounted && "bg-transparent"
          } flex items-center justify-center`}
          onClick={() => setMounted((s) => !s)}
        >
          <FiMenu />
        </label>
        <div
          className={`${
            styles.customTransition
          } z-[9999] absolute top-0 left-0 h-full w-full bg-blue-500/60 ${
            styles.clipPath
          } ${mounted && styles.activeClipPath}`}
        >
          <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            {navLinks.map((link) => (
              <li className="mb-5"  key={link.name}>
                <Link href={link.href}>
                  <a>{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
