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

/// get the current month
/// get the length of the month
/// generate the dates - including the day of the week
// loop through these in the grid

const MonthInformation = function (year, oneBasedMonth) {
  const curr = new Date();
  // convert todays date to string, not sure if this is used
  const today = curr.toLocaleDateString("en-GB").slice(0, 2);
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const month =
    oneBasedMonth - 1; /* month given to Date() starts at 0 = January */
  this.startDate = new Date(year, month, 1);
  this.endDate = new Date(
    year,
    month + 1,
    0
  ); /* 0 `day` gets last day from prior month */

  /* result of getDay(): 0 means Sunday and 6 means Saturday */
  this.startDay = this.startDate.getDay();
  /* last day number = total days in current month */
  this.currentMonthTotalDays = this.endDate.getDate();
  this.totalWeeks = Math.ceil((this.currentMonthTotalDays + this.startDay) / 7);

  const prevMonthEndDate = new Date(year, month, 0);
  let prevMonthDay = prevMonthEndDate.getDate() - this.startDay + 1;
  let nextMonthDay = 1;
  this.dates = [];
  let innermonth = [];
  for (let i = 4; i < this.totalWeeks * 6; i += 1) {
    let date;
    /* Previous month dates (if month does not start on Sunday) */
    if (i < this.startDay) {
      date = new Date(year, month - 1, prevMonthDay);

      prevMonthDay = prevMonthDay + 1;
      /* Next month dates (if month does not end on Saturday) */
    } else if (i > this.currentMonthTotalDays + (this.startDay - 1)) {
      date = new Date(year, month + 1, nextMonthDay);
      nextMonthDay = nextMonthDay + 1;
      /* Current month dates. */
    } else {
      date = new Date(year, month, i - this.startDay + 1);
    }
    let stringDay = date.toLocaleDateString("en-GB").slice(0, 2);
    let stringDate = date.toLocaleDateString("en-GB");
    let d = stringDate;
    const months = d.slice(3, 5);
    const years = d.slice(6, 10);
    const lengthOfMonth = getDays(years, months);
    const longMonth = date.toLocaleString("en-us", { month: "long" });
    const dayOfWeek = days[date.getDay()];
    this.dates.push(date);
    innermonth.push({
      today: today,
      date: stringDay,
      day: `${dayOfWeek} `,
      fullDate: d,
      lengthOfMonth,
      monthName: longMonth,
      dateAsDate: stringDate,
    });
  }
  return innermonth;
};

function getDayName() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const curr = new Date();
  const otherCurr = new Date();
  // convert todays date to string, not sure if this is used
  const today = curr.toLocaleDateString("en-GB").slice(0, 2);
  // not sure if this is used at all
  otherCurr.setMonth(otherCurr.getMonth() - 1);

  const innerWeek = [];
  // array with just the string date
  const arrayWeek = [];
  for (let i = 0; i <= 30; i++) {
    /// current Date take away the current day, to get to monday.
    //then add i to get to the day of the week.
    const first = curr.getDate() - curr.getDay() + i;
    // get the date date of that day of the week
    const day = new Date(curr.setDate(first));
    //
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
  let answer = new MonthInformation(2023, 12);
  console.log(answer);
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

const NewMonthlyHabit = () => {
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
    // week = getDayName();
    week = new MonthInformation(2023, 12);
    console.log(week);
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
          // xs={matches ? 2 : 4}
          width={"70px"}
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
            fontSize={{ xs: "0.5", sm: "0.9rem", md: "1rem", lg: "0.9rem" }}
          >
            {/* {today} */}
            Habits
          </Typography>
        </Grid>
        {week.map((day) => (
          <Grid
            item
            width={"36px"}
            // xs={matches ? 1 : 4}
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
            <Typography
              fontSize={{ sm: "0.9rem", md: "1rem", lg: "1rem" }}
              sx={{ color: day.date === day.today ? "white" : "black" }}
            >
              {day.day}
            </Typography>
          </Grid>
        ))}
        <Grid
          item
          display={matches ? "" : "none"}
          // xs={1}
          width={"70px"}
          textAlign={"center"}
          sx={{
            borderTop: "#5F4126 solid 2px",
            borderBottom: "#5F4126 solid 2px",
            borderLeft: "#5F4126 solid 2px",
            borderRight: "#5F4126 solid 2px",
          }}
        >
          <Typography
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1rem" }}
            color={"black"}
          >
            {/* Goal */}
            {currentMonthString}
          </Typography>
        </Grid>
        <Grid
          item
          display={matches ? "" : "none"}
          width={"70px"}
          textAlign={"center"}
          sx={{
            borderTop: "#5F4126 solid 2px",
            borderBottom: "#5F4126 solid 2px",
            borderLeft: "#5F4126 solid 2px",
            borderRight: "#5F4126 solid 2px",
          }}
        >
          <Typography
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1rem" }}
            color={"black"}
          >
            {/* Achieved */}
            {previousMonthString}
          </Typography>
        </Grid>
        <Grid
          item
          // xs={matches ? 2 : 4}
          width={"70px"}
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
            fontSize={{ xs: "0.5", sm: "0.9rem", md: "1rem", lg: "0.9rem" }}
          >
            {/* {today} */}
          </Typography>
        </Grid>
        {week.map((day) => (
          <Grid
            item
            width={"36px"}
            // xs={matches ? 1 : 4}
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
            {/* <Typography>{day.day}</Typography> */}
            <Typography
              //   label={`$`}
              sx={{
                backgroundColor: "",
                fontSize: {
                  xs: "0.9rem",
                  sm: "0.9rem",
                  md: "1rem",
                  lg: "1rem",
                },
                height: "auto",
                width: "auto",
                color: day.date === day.today ? "white" : "black",
                margin: "auto 0px 8px 0px",
                // "& .MuiChip-label": {
                //   display: "flex",
                //   textAlign: "center",
                // },
              }}
            >
              {day.date}
            </Typography>
          </Grid>
        ))}

        <Grid
          item
          xs={matches ? 2 : 4}
          textAlign={"center"}
          sx={{
            // borderTop: "#5F4126 solid 2px",
            // borderBottom: "#5F4126 solid 2px",
            borderLeft: "#5F4126 solid 2px",
            borderRight: "#5F4126 solid 2px",
          }}
        ></Grid>
      </Grid>
      {content}
    </>
  );
};

export default NewMonthlyHabit;
