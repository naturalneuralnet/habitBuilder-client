import React from "react";
import { useMatch, useParams } from "react-router-dom";
import { Paper, useTheme, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import new_card from "../../assets/newest_card.png";

const CheckEmail = () => {
  const theme = useTheme();

  const params = useParams();

  const { userEmail } = params;

  const match = useMatch(`login/check/:${userEmail}`);

  let content;

  if (match) {
    content = (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
            textAlign={"center"}
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            Great! You've signed up! Before you can login, please verify your
            account at{" "}
            <Typography
              fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
              sx={{ color: theme.palette.background.alt }}
              textAlign={"center"}
              gutterBottom
              fontWeight={600}
            >
              {userEmail}
            </Typography>{" "}
            Make sure to check your spam folder!
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#180e0e",
              color: "white",
              fontSize: "18px",
              borderRadius: "1px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              LOGIN
            </Link>
          </Button>
        </Box>
      </>
    );
  } else {
    content = (
      <>
        <Typography
          variant="h4"
          textAlign={"center"}
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          There was an error, please try again.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#180e0e",
            color: "white",
            fontSize: "18px",
            borderRadius: "1px",
          }}
        >
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            Signup
          </Link>
        </Button>
      </>
    );
  }
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Paper
          sx={{
            backgroundColor: theme.palette.secondary.main,
            backgroundImage: `url(${new_card})`,
            backgroundSize: "repeat",
            padding: "10px",
            margin: "20px",
            width: "50%",
            border: "black solid 1px",
          }}
          elevation={4}
        >
          {content}
        </Paper>
      </Box>
    </>
  );
};

export default CheckEmail;
