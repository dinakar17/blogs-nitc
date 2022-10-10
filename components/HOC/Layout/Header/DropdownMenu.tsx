import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { logOut } from "../../../../store/StatesContainer/auth/AuthSlice";

type Props = {
  children: React.ReactNode;
};

function DropdownMenu({ children }: Props) {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event: any) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleItem(href: string) {
    handleClose();
    router.push(href);
  }

  const authMenuItems = [
    {
      name: "Write a Blog",
      icon: "fa-regular fa-pen-to-square",
      href: "/blog/create",
    },
    {
      name: "My Blogs",
      icon: "fa-solid fa-book-bookmark",
      href: "/user/my-profile",
    },
    {
      name: "Edit Profile",
      icon: "fa-regular fa-address-card",
      href: "/user/edit-profile",
    },
    {
      name: "Logout",
      icon: "fa-sharp fa-solid fa-arrow-right-from-bracket",
      href: "/auth/logout",
    },
  ];

  return (
    <div>
      <div
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        PaperProps={{
          style: {
            marginTop: "3rem",
            marginLeft: "-3rem",
          },
        }}
      >
        {authMenuItems.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => {
              if (item.href === "/auth/logout") {
                dispatch(logOut());
                router.push("/auth/login");
              } else handleItem(item.href);
            }}
            className="dark:text-white dark:bg-[#1F2028]"
          >
            <i className={`${item.icon} text-lg pr-3`} />
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropdownMenu;

// Todo: Add cursor pointer to the menu
// Todo: Dark mode for material ui components
