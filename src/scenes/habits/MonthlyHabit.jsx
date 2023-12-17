import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import Calendar from "react-calendar";
import { Box } from "@mui/system";
import { differenceInCalendarDays } from "date-fns";

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}
// import "react-calendar/dist/Calendar.css";

// Select habits by ID
// Then each habit gets a calender for it.
{
  /* <Calendar
  onChange={onChange}
  value={val}
  onClickDay={(e) => handleDayClick(e)}
  tileClassName={tileClassName}
/>; */
}

const white = (
  <>
    <Box
      width={"10px"}
      height={"10px"}
      sx={{
        backgroundColor: "white",
      }}
    ></Box>
  </>
);

const green = (
  <>
    <Box
      width={"10px"}
      height={"10px"}
      sx={{
        backgroundColor: "green",
      }}
    ></Box>
  </>
);

const content = (
  <>
    <Stack direction="row" gap={1}>
      {white}
      {green}
    </Stack>
  </>
);

const today = new Date();
const datesToAddContentTo = [today];

function tileContent({ date, view }) {
  // Add class to tiles in month view only
  if (view === "month") {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (datesToAddContentTo.find((dDate) => isSameDay(dDate, date))) {
      return content;
    }
  }
}
const MonthlyHabit = () => {
  const theme = useTheme();
  return (
    <>
      {/* <Typography color={theme.palette.primary.main} variant="h1">
        UNDER CONSTRUCTION
      </Typography> */}
      <Box display={"flex"} justifyContent={"center"}>
        <Calendar tileContent={tileContent}></Calendar>
      </Box>
    </>
  );
};

export default MonthlyHabit;
