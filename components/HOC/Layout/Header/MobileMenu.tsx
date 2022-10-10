import {
  Divider,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../../store/StatesContainer/auth/AuthSlice";
import { AppDispatch, RootState } from "../../../../store/store";

type Anchor = "top" | "left" | "bottom" | "right";

const MobileMenu = () => {
  const router = useRouter();

  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [state, setState] = useState({
    left: false,
  });

  const menuItems = [
    { name: "Home", icon: "fa-sharp fa-solid fa-house", href: "/" },
    {
      name: "Blogs",
      icon: "fa-solid fa-rectangle-history",
      href: "/blog",
    },
    {
      name: "About",
      icon: "fa-solid fa-info-circle",
      href: "/about",
    },
    {
      name: "Projects",
      icon: "fa-solid fa-project-diagram",
      href: "/projects",
    },
  ];

  const authMenuItems = [
    { name: "Write a Blog", icon: "fa-solid fa-pen", href: "/blog/create" },
    {
      name: "My Blogs",
      icon: "fa-solid fa-newspaper",
      href: "/user/my-profile",
    },
    {
      name: "Edit Profile",
      icon: "fa-solid fa-user-edit",
      href: "/user/edit-profile",
    },
    { name: "Logout", icon: "fa-solid fa-sign-out-alt", href: "/auth/logout" },
  ];

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      // change background color
      className="w-[220px] flex flex-col"
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => router.push(item.href)}
          >
            <ListItemButton>
              <ListItemText primary={item.name} sx={{ fontSize: "1.2rem" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {token && (
        <List>
          {authMenuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => {
                if (item.href === "/auth/logout") {
                  dispatch(logOut());
                  router.push("/auth/login");
                } else {
                  router.push(item.href);
                }
              }}
            >
              <ListItemButton>
                {/* <ListItemIcon>
                <Icon className={item.icon} />
              </ListItemIcon> */}
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );

  return (
    <>
      <div>
        <div onClick={toggleDrawer("left", true)} className="cursor-pointer">
          <i className="fa-solid fa-bars scale-150"></i>
        </div>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </div>
    </>
  );
};

export default MobileMenu;

// Todo: Add Icons to the menu items
// Todo: Better UI for the menu items
