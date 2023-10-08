import React from "react";
import { Box, Paper, useTheme } from "@mui/material";
import Header from "components/Header";
import NewHabitForm from "./NewHabitForm";

import useAuth from "hooks/useAuth";

// Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
const NewHabit = () => {
  const { userId, isAdmin } = useAuth();

  const theme = useTheme();

  if (!userId?.length) return <p>Not Currently Available</p>;

  return (
    <Box className="Header">
      <Box width="100%" m={"1rem 2rem"}>
        <Header title={"Add Habits"} subtitle={"Add a new habit here"}></Header>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{ backgroundColor: theme.palette.secondary[600], width: "300px" }}
          elevation={4}
        >
          <NewHabitForm user={userId}></NewHabitForm>
        </Paper>
      </Box>
    </Box>
  );
};

export default NewHabit;
