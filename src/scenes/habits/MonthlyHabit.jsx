import React from "react";
import CalenderBox from "components/CalenderBox";
import { Typography, useTheme } from "@mui/material";

const MonthlyHabit = () => {
  const theme = useTheme();
  return (
    <>
      {/* <CalenderBox></CalenderBox> */}

      <Typography color={theme.palette.primary.main} variant="h1">
        UNDER CONSTRUCTION
      </Typography>
    </>
  );
};

export default MonthlyHabit;