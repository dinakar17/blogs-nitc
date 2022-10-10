import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { logOut } from "../../store/StatesContainer/auth/AuthSlice";

type Props = {
  children: React.ReactNode;
};

function SimpleMenu({ children }: Props) {
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
      >
        {children}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        // add border-radius
        PaperProps={{
          style: {
            borderRadius: "0.3rem",
            marginTop: "0.5rem",
            padding: "0.5rem 0",
            // height: "20rem",
            // overflow: "auto",
          },
        }}
      >
        {authMenuItems.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => {
              if (item.href === "/auth/logout") {
                dispatch(logOut());
              } else handleItem(item.href);
            }}
          >
            <i className={`${item.icon} text-lg pr-3`} />
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default SimpleMenu;
