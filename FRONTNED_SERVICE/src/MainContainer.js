import React, { useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserEvents, getUser } from "./store/action/allActions";
import { ThemeProvider } from "@mui/material/styles";
import { mainTheme } from "./theme/theme";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import HomeIcon from "@mui/icons-material/Home";
import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignupPage";
import Invitations from "./screens/Invitations";
import MyEvents from "./screens/MyEvents";
import CreateEvent from "./screens/CreateEvent";
import LoadingPage from "./screens/LoadingPage";
import PageNotFound from "./screens/PageNotFound";
import { BrowserRouter } from "react-router-dom";
import AlertToast from "./components/AlertToast";
import InboxIcon from "@mui/icons-material/Inbox";

const MainContainer = () => {
  const dispatch = useDispatch();
  const { token, loading, user } = useSelector(({ auth }) => ({
    token: auth.token,
    loading: auth.loading,
    user: auth.user,
  }));

  const { event } = useSelector(({ events }) => ({
    event: events.event,
  }));

  useEffect(() => {
    if (token) {
      dispatch(getUser());
      dispatch(fetchUserEvents());
    }
  }, [dispatch, token]);

  const navItemList = [
    {
      name: "Home",
      icon: <HomeIcon />,
      link: "/CreateEvent",
    },
    {
      name: "Invitations",
      icon: <InboxIcon />,
      link: "/Invitations",
    },
    {
      name: "My Events",
      icon: <CalendarMonthSharpIcon />,
      link: "/MyEvents",
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && location.pathname === "/login") {
      navigate("/CreateEvent");
    }
  }, [token, location, navigate]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <AlertToast />
      {token ? (
        <ResponsiveDrawer navItems={navItemList}>
          <Routes>
            <Route path="/" element={<Navigate to="/CreateEvent" />} />
            <Route
              path="/CreateEvent"
              element={<CreateEvent event={event} />}
            />
            <Route path="/Invitations" element={<Invitations />} />
            <Route path="/MyEvents" element={<MyEvents />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ResponsiveDrawer>
      ) : (
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </ThemeProvider>
  );
};

export default MainContainer;
