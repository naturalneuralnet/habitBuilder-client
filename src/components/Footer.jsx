import React from "react";
//import useAuth from "hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
//import HomeIcon from "@mui/icons-material/Home";
import leather from "../assets/basketball.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, AppBar, Toolbar, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // const { pathname } = useLocation();

  // const onGoHomeClicked = () => navigate("/dash");

  // let goHomeButton = null;
  // if (pathname !== "/dash") {
  //   goHomeButton = (
  //     <IconButton onClick={onGoHomeClicked}>
  //       <HomeIcon sx={{ fontSize: "25px" }}></HomeIcon>
  //     </IconButton>
  //   );
  // }

  let githubButton = (
    <IconButton>
      <GitHubIcon sx={{ fontSize: "25px" }}></GitHubIcon>
    </IconButton>
  );

  const content = (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.primary.main,
        backgroundImage: `url(${leather})`,
        backgroundSize: "repeat",
        boxShadow: "none",
        padding: "5px",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {githubButton}

        <p>Copyright @ naturalneuralnet</p>
        {/* <p>Status: {roles}</p> */}
      </Toolbar>
    </AppBar>
  );
  return content;
};

export default Footer;
