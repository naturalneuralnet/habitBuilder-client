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
//import profilePicture from "assets/profilePicture.jpg";
import { useSendLogoutMutation } from "scenes/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import leather from "../assets/basketball.png";
import { Box } from "@mui/system";
// const DASH_REGEX = /^\/welcome(\/)?$/;
// const NOTES_REGEX = /^\/habits(\/)?$/;
const USERS_REGEX = /^\/users(\/)?$/;

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  // const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  // const pathname = useLocation().pathname;
  const { isAdmin } = useAuth();
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => setAnchorEl(event.currentTarget);

  //// Logout Button logic
  /// send Logout function and others from the mutation
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  /// useffect, if the logout is successful it takes you to the welcome page the root page

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <Typography>Logging Out...</Typography>;

  if (isError) return <Typography>Error: {error.data?.message}</Typography>;

  // console.log(username);

  // let logOutButton = <></>;
  /// if the pathname is not /welcome or /habits or /users then the logout button should show

  // if (
  //   !DASH_REGEX.test(pathname) &&
  //   !HABITS_REGEX.test(pathname) &&
  //   !USERS_REGEX.test(pathname)
  // ) {
  //   logOutButton = (
  //     <IconButton>
  //       <Logout sx={{ fontSize: "25px" }} onClick={sendLogout}></Logout>
  //     </IconButton>
  //   );
  // }

  /// maybe i should have this in the sidebar?

  /// new button handlers
  // const onNewNoteClicked = () => navigate("/dash/new");
  // const onNewUserClicked = () => navigate("/dash/users/new");
  // const onNotesClicked = () => navigate("/dash/habits");
  const onUsersClicked = () => navigate("/dash/users");

  // /// new buttons

  // let newNoteButton = null;
  // if (!NOTES_REGEX.test(pathname)) {
  //   newNoteButton = (
  //     <IconButton onClick={onNewNoteClicked}>
  //       <PlaylistAddOutlinedIcon></PlaylistAddOutlinedIcon>
  //     </IconButton>
  //   );
  // }

  // let newUserButton = null;
  // if (USERS_REGEX.test(pathname)) {
  //   newUserButton = (
  //     <IconButton onClick={onNewUserClicked}>
  //       <Groups2Outlined>New User</Groups2Outlined>
  //     </IconButton>
  //   );
  // }

  let userButton = null;
  if (isAdmin) {
    // if (USERS_REGEX.test(pathname) && pathname.includes("/dash/habits")) {
    console.log("USERS REGEX PASSES");
    userButton = (
      <IconButton onClick={onUsersClicked}>
        <AdminPanelSettingsOutlined
          sx={{ fontSize: "25px" }}
        ></AdminPanelSettingsOutlined>
      </IconButton>
    );
  }
  // }

  // let notesButton = null;
  // if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
  //   notesButton = (
  //     <IconButton onClick={onNotesClicked}>
  //       <ChecklistOutlinedIcon></ChecklistOutlinedIcon>
  //     </IconButton>
  //   );
  // }

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
        {/* {newNoteButton}
        {newUserButton}
        {notesButton} */}
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
