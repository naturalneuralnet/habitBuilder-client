import React, { useCallback, useEffect } from "react";
import {
  useTheme,
  ButtonGroup,
  Typography,
  Button,
  Box,
  Paper,
  Modal,
} from "@mui/material";
import { useState } from "react";
import useAuth from "hooks/useAuth";
import NewHabitModal from "./NewHabitModal";
import WeeklyHabits from "./WeeklyHabits";
import MonthlyHabit from "./MonthlyHabit";
import NewMonthlyHabit from "./NewMonthlyHabit";
import YearlyHabits from "./YearlyHabits";
import leather from "../../assets/basketball.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Stack } from "@mui/system";
import new_card from "../../assets/newest_card.png";

// Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
const HabitsList = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const [currentView, setCurrentView] = useState("Weekly");
  const [toShow, setToShow] = useState(<WeeklyHabits></WeeklyHabits>);

  const { username, roles } = useAuth();
  const [open, setOpen] = useState(roles[0] === "guest" ? true : false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateCurrentView = useCallback(() => {
    if (currentView === "weekly") {
      setToShow(<WeeklyHabits></WeeklyHabits>);
    } else if (currentView === "monthly") {
      setToShow(<NewMonthlyHabit></NewMonthlyHabit>);
    } else if (currentView === "yearly") {
      setToShow(<YearlyHabits></YearlyHabits>);
    }
  }, [currentView]);

  useEffect(() => {
    updateCurrentView();
  }, [currentView, updateCurrentView]);

  const theme = useTheme();
  return (
    <Box className="HabitBox" m={"1rem 2rem"}>
      {/* UPPER BOX */}
      <Box margin={"15px 0px 15px 0px"}>
        <Stack
          direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            sx={{
              width: { xs: "200px", sm: "250px", md: "350px", lg: "400px" },
              background: theme.palette.primary.main,
              backgroundImage: `url(${leather})`,
              backgroundSize: "repeat",
              padding: "10px",
            }}
          >
            <Paper
              sx={{
                padding: "15px",
                borderRadius: "1px",
                background: "#ded0b9",
                backgroundImage: `url(${new_card})`,
                backgroundSize: "repeat",
              }}
              elevation={3}
            >
              <Typography
                variant="h3"
                fontSize={{ xs: "12px", sm: "14px", md: "18px", lg: "22px" }}
                color={theme.palette.primary.main}
              >
                Welcome {username}
              </Typography>
              <Typography
                variant="h5"
                fontSize={{ xs: "10px", sm: "12px", md: "16px", lg: "18px" }}
                color={theme.palette.primary.main}
              >
                Track your habits and progress
              </Typography>
            </Paper>
          </Box>
          <Box
            className={"WeeklyButtonsGroup"}
            gap={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "row",
                sm: "row",
                md: "row",
                lg: "row",
              },
              width: "100%",
              padding: "15px",
              // "& > *": {
              //   m: 1,
              // },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ButtonGroup
                variant="contained"
                size={matches ? "large" : "small"}
                aria-label="large button group"
              >
                <Button
                  className="bevel-button"
                  size={matches ? "large" : "small"}
                  key="one"
                  value="weekly"
                  onClick={(e) => setCurrentView(e.target.value)}
                >
                  Weekly
                </Button>
                <Button
                  className="bevel-button"
                  key="two"
                  value="monthly"
                  onClick={(e) => setCurrentView(e.target.value)}
                >
                  Monthly
                </Button>
                <Button
                  className="bevel-button"
                  key="three"
                  value="yearly"
                  onClick={(e) => setCurrentView(e.target.value)}
                >
                  Yearly
                </Button>
              </ButtonGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <NewHabitModal
                  open={handleOpen}
                  close={handleClose}
                ></NewHabitModal>
              </Modal>

              <Button
                className="bevel-button"
                variant="filled"
                size={matches ? "large" : "small"}
                key="one"
                sx={{ backgroundColor: "#0e534e" }}
                onClick={handleOpen}
              >
                <Typography
                  fontSize={{
                    xs: "0.6rem",
                    sm: "0.7rem",
                    md: "0.8rem",
                    lg: "0.8rem",
                  }}
                >
                  NEW HABIT
                </Typography>
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>
      {/* HABIT BOX */}
      <Box
        className={"HabitsBox"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          height: "100%",
          marginTop: "5px",
          background: theme.palette.primary.main,
          backgroundImage: `url(${leather})`,
          backgroundSize: "repeat",
          padding: "10px",

          "& > :not(style)": {
            width: "100%",
            height: "59vh",
          },
        }}
      >
        <Paper
          sx={{
            background: "#ded0b9",
            backgroundImage: `url(${new_card})`,
            backgroundSize: "repeat",
            padding: "10px",
            border: "#5F4126 solid 1px",
          }}
          elevation={4}
        >
          {toShow}
        </Paper>
      </Box>
    </Box>
  );
};

export default HabitsList;
