import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import FaceIcon from "@mui/icons-material/Face";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import icon from "../images/logo.png";
import { useColors } from "../theme/theme";
import { AUTH } from "../store/constants";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 210;

const ResponsiveDrawer = (props) => {
  const color = useColors();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { children, navItems } = props;
  const { pathname } = window.location;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useSelector(({ auth }) => ({
    user: auth.user,
  }));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 55,
          gap: 1,
        }}
      >
        <img src={icon} alt="icon" height="40px" />
        <Typography sx={{ color: color.white, letterSpacing: 1 }}>
          EVS
        </Typography>
      </Box>
      <List>
        {navItems.map((item, index) => (
          <ListItemButton
            key={index}
            sx={{
              height: 55,
              px: 2.5,
            }}
            onClick={() => {
              setMobileOpen(false);
              navigate(item.link);
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                mr: 1,
                color: color.white,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <Typography
              sx={{
                color: color.white,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Typography>
          </ListItemButton>
        ))}
        <ListItemButton
          sx={{
            height: 55,
            px: 2.5,
          }}
          onClick={() => {
            localStorage.setItem("access_token", "");
            dispatch({
              type: AUTH.USER_DETAILS_SUCCESS,
              payload: undefined,
            });
            navigate("/");
            window.location.reload();
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              mr: 1,
              color: color.white,
            }}
          >
            <LogoutIcon />
          </ListItemIcon>
          <Typography
            sx={{ color: color.white, fontSize: 15, fontWeight: "bold" }}
          >
            Log Out
          </Typography>
        </ListItemButton>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: color.primary,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <MenuIcon
            sx={{ color: color.white, display: ["block", "none"] }}
            onClick={handleDrawerToggle}
          />
          <Typography
            sx={{
              fontWeight: 500,
              color: color.white,
              display: ["none", "block"],
              fontSize: 20,
            }}
          ></Typography>

          <Box
            sx={{
              display: "flex",
              marginX: 1,
              gap: 0.5,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                minWidth: [0, 230],
                display: "flex",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ height: 30, width: 30 }}
                src="/static/images/avatar/2.jpg"
              />
              <Typography sx={{ color: color.white, fontSize: 15 }}>
                {user?.name}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: color.primary,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: color.primary,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <>{children}</>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
