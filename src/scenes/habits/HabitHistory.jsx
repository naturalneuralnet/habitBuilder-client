import React from "react";
import Header from "components/Header";
import { Box, Paper, List, Typography, useTheme } from "@mui/material";
const HabitHistory = () => {
  const theme = useTheme();
  return (
    <Box className="HabitBox">
      <Box m={"1rem 2rem"}>
        <Header title={"History"} subtitle={"View Habit history here"}></Header>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",

          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <Paper
          sx={{
            backgroundColor: theme.palette.secondary[500],
            padding: "10px",
            border: "white solid 1px",
          }}
          elevation={4}
        >
          <Typography variant="h2">Coming Soon</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default HabitHistory;
