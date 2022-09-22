import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Toggle from "../../../../helpers/Toggle/toggle";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { logOut } from "../../../../store/StatesContainer/auth/AuthSlice";
import { persistor } from "../../../../pages/_app";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { authData } = user;
  console.log(authData);

  const { theme, setTheme } = useTheme();
  const [toggled, setToggled] = React.useState(false);
  const handleClick = () => {
    setToggled((s) => !s);
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
  ];

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
    <header className="flex items-center w-[90%] mx-auto">
      <Link href="/"> Blog App </Link>
      <nav className="flex items-center ml-auto justify-center gap-5">
        <ul className="flex gap-5 items-center">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <a>{link.name}</a>
            </Link>
          ))}
        </ul>
        {authData ? (
          <div className="">
            <div className="group flex items-center gap-2 relative transition-all">
              {/* className isn't working for Link */}
              <Link href="/profile">
              <img
                src={authData.photo}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              </Link>
                {/* <a className="font-bold">{authData.name}</a> */}
              {/* Dropdown menu */}
              <div className="invisible absolute top-12 -left-7 bg-white w-40 rounded-md shadow-lg group-hover:visible transition-all z-20">
                <ul className="flex flex-col gap-2 p-2">
                  <li>
                    <Link href="/blog/create">
                      <a>Write a Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-blogs">
                      <a>My Blogs</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile">
                      <a>Profile</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/edit-profile">
                      <a>Edit Profile</a>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Note: () => handleLogOut won't invoke handleLogOut */}
            {/* <button onClick={handleLogOut}>Logout</button> */}
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
        {/* Problem: Extra space is being added here */}
        <div className="scale-[0.25] overflow-hidden">
          <Toggle toggled={toggled} onClick={handleClick} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
