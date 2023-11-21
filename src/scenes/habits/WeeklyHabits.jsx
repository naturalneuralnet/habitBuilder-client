import {
  Grid,
  Typography,
  Chip,
  useTheme,
  List,
  ListItem,
} from "@mui/material";
import { useGetAllHabitsQuery } from "./habitsApiSlice";
import React from "react";
import Habit from "./Habit";
import useAuth from "hooks/useAuth";
import useMediaQuery from "@mui/material/useMediaQuery";
const getDays = (year, month) => new Date(year, month, 0).getDate();

function getDayName() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const curr = new Date();
  const otherCurr = new Date();
  const today = curr.toLocaleDateString("en-GB").slice(0, 2);
  otherCurr.setMonth(otherCurr.getMonth() - 1);

  const innerWeek = [];
  const arrayWeek = [];
  for (let i = 0; i <= 6; i++) {
    const first = curr.getDate() - curr.getDay() + i;
    const day = new Date(curr.setDate(first));
    const stringDay = day.toLocaleDateString("en-GB").slice(0, 2);
    const d = day.toLocaleDateString("en-GB");
    const dayOfWeek = days[day.getDay()];
    const month = d.slice(3, 5);
    const year = d.slice(6, 10);
    const lengthOfMonth = getDays(year, month);
    const longMonth = day.toLocaleString("en-us", { month: "long" });
    innerWeek.push({
      today: today,
      date: stringDay,
      day: `${dayOfWeek} `,
      fullDate: d,
      lengthOfMonth,
      monthName: longMonth,
      dateAsDate: day,
    });
    arrayWeek.push(d);
  }

  return innerWeek;
}

function getToday() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  const innerDay = [];

  const sliced_today = today.toLocaleDateString("en-GB").slice(" ");
  const stringDay = today.toLocaleDateString("en-GB").slice(0, 2);
  const d = today.toLocaleDateString("en-GB");
  const dayOfWeek = days[today.getDay()];
  const month = d.slice(3, 5);
  const year = d.slice(6, 10);
  const lengthOfMonth = getDays(year, month);
  const longMonth = today.toLocaleString("en-us", { month: "long" });

  innerDay.push({
    today: stringDay,
    date: stringDay,
    day: `${dayOfWeek} `,
    fullDate: d,
    lengthOfMonth,
    monthName: longMonth,
    dateAsDate: today,
  });

  return innerDay;
}

const WeeklyHabits = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const theme = useTheme();
  const { userId, isAdmin } = useAuth();
  const {
    data: habits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllHabitsQuery();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);

  const currentMonthString = date.toLocaleString("default", { month: "short" });
  date.setMonth(date.getMonth() - 1);
  const previousMonthString = date.toLocaleString("default", {
    month: "short",
  });

  let week;
  if (matches) {
    week = getDayName();
  } else {
    week = getToday();
  }

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = habits;

    const filteredHabits = Object.values(habits.entities).filter(
      (habit) => habit.user === userId
    );

    let filteredIds;
    if (isAdmin) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter(
        (habitId) => entities[habitId].userId === userId
      );
    }

    const filteredHabitIds = filteredHabits.map((habit) => habit.id);

    content = (
      <List>
        {filteredHabitIds.map((habitId) => {
          return (
            <ListItem sx={{ m: "10px 0px" }} key={habitId} disablePadding>
              <Habit key={habitId} habitId={habitId} week={week}></Habit>
            </ListItem>
          );
        })}
      </List>
    );
  }
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={matches ? 2 : 4}
          sx={{
            borderTop: "#5F4126 solid 2px",
            borderBottom: "#5F4126 solid 2px",
            borderLeft: "#5F4126 solid 2px",
            borderRight: "#5F4126 solid 2px",
          }}
        >
          <Typography
            textAlign={"center"}
            color={theme.palette.primary.main}
            fontSize={{ xs: "0.5", sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
          >
            {today}
          </Typography>
        </Grid>
        {week.map((day) => (
          <Grid
            item
            xs={matches ? 1 : 4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderTop: "#5F4126 solid 2px",
              borderBottom: "#5F4126 solid 2px",
              borderLeft: "#5F4126 solid 2px",
              borderRight: "#5F4126 solid 2px",
              backgroundColor: day.date === day.today ? "#0e534e" : "",
            }}
          >
            <Chip
              label={`${day.date}\n ${day.day}`}
              sx={{
                backgroundColor: "",
                fontSize: {
                  xs: "0.9rem",
                  sm: "0.9rem",
                  md: "1rem",
                  lg: "1.3rem",
                },
                height: "auto",
                width: "auto",
                color: day.date === day.today ? "white" : "black",
                margin: "auto auto 8px auto",
                "& .MuiChip-label": {
                  display: "flex",
                  textAlign: "center",
                },
              }}
            ></Chip>
          </Grid>
        ))}
        <Grid
          item
          display={matches ? "" : "none"}
          xs={1}
          textAlign={"center"}
          sx={{
            borderTop: "#5F4126 solid 2px",
            borderBottom: "#5F4126 solid 2px",
            borderLeft: "#5F4126 solid 2px",
            borderRight: "#5F4126 solid 2px",
          }}
        >
          <Typography
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
            color={"black"}
          >
            {currentMonthString}
          </Typography>
        </Grid>
        <Grid
          item
          display={matches ? "" : "none"}
          xs={1}
          textAlign={"center"}
          sx={{
            borderTop: "#5F4126 solid 2px",
            borderBottom: "#5F4126 solid 2px",
            borderLeft: "#5F4126 solid 2px",
            borderRight: "#5F4126 solid 2px",
          }}
        >
          <Typography
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
            color={"black"}
          >
            {previousMonthString}
          </Typography>
        </Grid>
        <Grid
          item
          xs={matches ? 2 : 4}
          textAlign={"center"}
          sx={{
            borderTop: "#5F4126 solid 2px",
            borderBottom: "#5F4126 solid 2px",
            borderLeft: "#5F4126 solid 2px",
            borderRight: "#5F4126 solid 2px",
          }}
        ></Grid>
      </Grid>
      {content}
    </>
  );
};

export default WeeklyHabits;
