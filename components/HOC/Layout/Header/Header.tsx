// Todo: Add transition between dark and light mode

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { logOut } from "../../../../store/StatesContainer/auth/AuthSlice";

// Todo: DarkModeToggle is too big, reduce it's size
const DarkModeToggle = dynamic(() => import("react-dark-mode-toggle"), {
  ssr: false,
});

import Image from "next/image";

import styles from "styles/MobileMenu.module.css";
import dynamic from "next/dynamic";
import MobileMenu from "./MobileMenu";
import DropdownMenu from "./DropdownMenu";
import { customLoader } from "../../../../helpers/customImageLoader";

const Header = () => {
  const [mounted, setMounted] = React.useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { authData } = user;

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

  return (
    // Note: w-[80%] mx-auto is a Tailwind class that sets the width to 80% and centers the element and this is common practice for most websites.
    <header className="flex items-center py-4 font-medium text-gray-900 dark:text-gray-100">
      {/* Todo: remove w-[%] with another alternative */}
      <nav className="w-full md:w-[80%] mx-auto flex items-center justify-between">
        <div className="cursor-pointer">
          <Link href="/">
            <a className="relative">
              <Image
                src="/static/logo-for-nitc.png"
                alt="logo"
                loader={customLoader}
                width={100}
                height={100}
                objectFit="cover"
                priority
              />
            </a>
          </Link>
        </div>
        <ul className="text-gray-600 text-base md:flex gap-5 items-center hidden justify-center tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href}>
                <a
                  className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${
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
            <div className="z-[20] invisible md:visible relative group">
              <div className="cursor-pointer">
                <div className="w-10 h-10 relative cursor-pointer">
                  <DropdownMenu>
                    <Image
                      // Note: authData?.user is optional chaining, it means if authData is null then it will not throw an error
                      src={authData.photo ? authData.photo : "/static/default-avatar.png"}
                      loader={customLoader}
                      alt="profile"
                      layout="fill"
                      className="rounded-full object-cover cursor-pointer block m-auto"
                    />
                    {/* <img src={authData.photo ? authData.photo : "/static/default-avatar.png"} alt={authData?.name} className="w-full h-full rounded-full object-cover cursor-pointer block m-auto" /> */}
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue/40 active:opacity-[0.85] font-medium text-base capitalize py-2 px-4 rounded-md"
              type="button"
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </button>
          )}
          <div className="flex justify-center items-center mr-5 md:mr-0">
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
      <div className="md:invisible visible mr-7">
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
