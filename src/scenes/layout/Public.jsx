import React from "react";
import Header from "components/Header";

import {
  Box,
  Stack,
  Typography,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { styled } from "@mui/material/styles";
import { LottieGif } from "components/LottieGif";
import Signup from "scenes/auth/Signup";

const ColorButton = styled(Button)(({ theme }) => ({
  background: "#1484a6",

  backdropFilter: "blur(10px)",

  border: "1px solid rgba(255,255,255,0.25)",

  borderRadius: "5px",
  width: "200px",
}));

const Public = () => {
  const theme = useTheme();
  return (
    <>
      <Box display={"flex"} flexDirection={"row"} height={"100%"}>
        <Box
          //className="gradient-background"
          width="30%"
          display={"flex"}
          justifyContent={"center"}
          sx={{
            background: "black",
          }}
        >
          <Box m={"100px 50px "} width={"50%"} height={"60%"}>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                variant="h1"
                color="white"
                fontWeight="bold"
                align="center"
              >
                LOGIN
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <LottieGif></LottieGif>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                // href="/login"
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "#16b0d4",
                  fontSize: "20px",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "#16b0d4" }}
                  to="/login"
                >
                  LOGIN
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          // className="gradient-background"
          width="70%"
          display={"flex"}
          justifyContent={"center"}
          sx={{
            background: "black",
          }}
        >
          <Box m={"100px 50px "} width={"50%"} height={"60%"}>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                variant="h1"
                color="white"
                fontWeight="bold"
                sx={{ mb: "5px" }}
                align="center"
              >
                {" "}
                Build Habits Even of you miss a day
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <LottieGif></LottieGif>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                // href="/signup"
                variant="contained"
                sx={{
                  backgroundColor: "#79fac5",
                  color: "#16b0d4",
                  fontSize: "20px",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "#16b0d4" }}
                  to="/signup"
                >
                  SIGN UP
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Public;
