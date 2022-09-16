import React from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Toggle from "../../../../helpers/Toggle/toggle";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { logOut } from "../../../../store/StatesContainer/auth/AuthSlice";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const {authData, token} = user;
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
  return (
    // Note: w-[80%] mx-auto is a Tailwind class that sets the width to 80% and centers the element and this is common practice for most websites.
    <header className="flex items-center w-[80%] mx-auto">
      <div>Logo</div>
      <nav className="flex items-center ml-auto justify-center gap-5">
        <ul className="flex gap-5 items-center">
          {navLinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <a>{link.name}</a>
            </Link>
          ))}
        </ul>
        { authData ? (
          <div className="flex items-center gap-5">
            <Link href="/profile">
              <a>{authData.name}</a>
            </Link>
            <button onClick={() => dispatch(logOut())}>Logout</button>
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
