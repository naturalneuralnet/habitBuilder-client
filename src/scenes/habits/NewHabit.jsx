import React from "react";
import { Box, Divider, Paper, useTheme } from "@mui/material";
import Header from "components/Header";
import NewHabitForm from "./NewHabitForm";
import { useSelector } from "react-redux";
import { selectAllUsers } from "scenes/users/usersApiSlice";
import useAuth from "hooks/useAuth";
const NewHabit = () => {
  const { userId, isAdmin } = useAuth();
  // const users = useSelector(selectAllUsers);
  const theme = useTheme();
  // console.log("ALL USERS");
  // console.log(users);

  if (!userId?.length) return <p>Not Currently Available</p>;

  // const userId = users[0].id;
  // console.log(userId);

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
