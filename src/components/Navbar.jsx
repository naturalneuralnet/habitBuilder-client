import React, { useEffect } from "react";
import { Logout } from "@mui/icons-material";
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import { useSendLogoutMutation } from "scenes/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import leather from "../assets/basketball.png";
import { Box } from "@mui/system";
// const DASH_REGEX = /^\/welcome(\/)?$/;
// const NOTES_REGEX = /^\/habits(\/)?$/;
// const USERS_REGEX = /^\/users(\/)?$/;

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { isAdmin } = useAuth();

  //// Logout Button logic
  // send Logout function and others from the mutation
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  /// useffect, if the logout is successful it takes you to the welcome page the root page

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <Typography>Logging Out...</Typography>;

  if (isError) return <Typography>Error: {error.data?.message}</Typography>;

  const onUsersClicked = () => navigate("/dash/users");

  let userButton = null;
  if (isAdmin) {
    userButton = (
      <IconButton onClick={onUsersClicked}>
        <AdminPanelSettingsOutlined
          sx={{ fontSize: "25px" }}
        ></AdminPanelSettingsOutlined>
      </IconButton>
    );
  }

  const logoutButton = (
    <IconButton>
      <Logout sx={{ fontSize: "25px" }} onClick={sendLogout}></Logout>
    </IconButton>
  );

  // const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {userButton}
        {logoutButton}
      </>
    );
  }

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.primary.main,
        backgroundImage: `url(${leather})`,
        backgroundSize: "repeat",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          gap={"1.5rem"}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          ></Box>
          {buttonContent}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
