import React from "react";
import leather from "../assets/basketball.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, AppBar, Toolbar, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();

  let githubButton = (
    <IconButton
      type="link"
      href="https://github.com/naturalneuralnet/crt-timer"
      sx={{
        color: "white",
      }}
    >
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

        <p>Copyright @naturalneuralnet</p>
      </Toolbar>
    </AppBar>
  );
  return content;
};

export default Footer;
