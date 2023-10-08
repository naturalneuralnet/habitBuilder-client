import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Paper, useTheme, Box, Typography, Button } from "@mui/material";
import { useVerifyMutation } from "./authApiSlice";
import new_card from "../../assets/newest_card.png";

const Intro = () => {
  const theme = useTheme();
  const [verify, { isLoading, isSuccess, isError, error }] =
    useVerifyMutation();
  const { pathname } = useLocation();

  const splitPath = pathname.split("/");
  const confirmationCode = splitPath[3];

  /// or use useParams

  useEffect(() => {
    verify(confirmationCode);
  }, [confirmationCode, verify]);

  /// add a conditional here

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    <p className="errmsg">
      {`${error.data?.message} - `}{" "}
      <Link to="/signup">Please sign up again</Link>.{" "}
    </p>;
  } else if (isSuccess) {
    content = (
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
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                fontSize={{ sm: "0.8rem", md: "1rem", lg: "1.3rem" }}
                gutterBottom
                textAlign={"center"}
                fontWeight={600}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                Great! Your account is verified. You can now login.
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#180e0e",
                  color: "white",
                  borderRadius: "1px",
                  fontSize: { sm: "0.8rem", md: "1rem", lg: "1.3rem" },
                }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  LOGIN
                </Link>
              </Button>
            </Box>
          </Paper>
        </Box>
      </>
    );
  }

  return content;
};

export default Intro;
