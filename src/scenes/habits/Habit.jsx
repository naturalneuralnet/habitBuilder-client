import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  useTheme,
  Button,
  Checkbox,
  Typography,
  Stack,
  Grid,
  ButtonBase,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectHabitById,
  useDeleteHabitMutation,
  useUpdateHabitMutation,
} from "./habitsApiSlice";
import { Box } from "@mui/system";

const Habit = ({ habitId, week }) => {
  const matches = useMediaQuery("(min-width:900px)");

  const habit = useSelector((state) => selectHabitById(state, habitId));
  const { id, name, user, year } = habit;
  const today = new Date();
  const todayString = today.toLocaleDateString("en-GB");
  const currentMonth = today.getMonth();

  const percent = year[12][currentMonth];
  const lastMonthPercent = year[12][currentMonth - 1];
  const daysInWeek = week.map((day) => day.fullDate);
  const completed = year[currentMonth];
  const intersection = completed.filter((day) => {
    return daysInWeek.includes(day);
  });

  const isDayCompleted = daysInWeek.map((day) => {
    return intersection.includes(day);
  });

  const arr3 = daysInWeek.reduce((acc, current, index) => {
    return [...acc, [current, isDayCompleted[index]]];
  }, []);

  const formattedDaysAndCompletions = Object.entries(arr3).map(
    ([date, isCompleted]) => {
      return { date: isCompleted[0], completed: isCompleted[1] };
    }
  );

  const [updateHabit, { isLoading, isSuccess }] = useUpdateHabitMutation();

  const [
    deleteHabit,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteHabitMutation();

  const handleComplete = (e) => setDate(e.target.value);
  const theme = useTheme();

  const [date, setDate] = useState("");

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setDate("");
    }
  }, [isSuccess, isDelSuccess]);

  const canSave = !isLoading;

  const onDeleteHabitClicked = async () => {
    await deleteHabit({ id: habit.id });
  };

  const getDays = (year, month) => new Date(year, month, 0).getDate();

  const getMonthStreak = (date) => {
    const month = currentMonth;
    const completedDaysLength = habit.year[month].length;
    const year = date.slice(6, 10);
    const lengthOfMonth = getDays(year, month);
    const percentage = Math.round((completedDaysLength * 100) / lengthOfMonth);

    return percentage;
    /// get the list of dates that correspond to that month
    // calculate the percentage
  };

  const onCheckBoxClicked = async (e, day) => {
    let deepCopyHabit = JSON.parse(JSON.stringify(habit));
    deepCopyHabit.year[currentMonth].push(day.date);

    const percent = getMonthStreak(day.date);

    deepCopyHabit.year[12][currentMonth] = percent;

    if (canSave) {
      await updateHabit({ id, name, user, year: deepCopyHabit.year });
    }
  };

  return (
    <Grid container padding={"0px"}>
      {/* NAME */}
      <Grid
        item
        // xs={matches ? 2 : 4}
        width={"70px"}
        borderTop={"#5F4126 solid 1px"}
        borderBottom={"#5F4126 solid 1px"}
        borderRight={"#5F4126 solid 1px"}
        borderLeft={"#5F4126 solid 1px"}
      >
        <Stack direction="column">
          <Typography
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "0.9rem" }}
            m={"4px"}
            color={theme.palette.primary.main}
            fontWeight="bold"
            textAlign={"center"}
          >
            {habit.name}
          </Typography>
        </Stack>
      </Grid>
      {/* CHECKBOXES */}
      {/* <Stack direction="column"> */}
      {formattedDaysAndCompletions.map((day) => (
        <ButtonBase
          onChange={handleComplete}
          // checked={day.completed}
          // disabled={day.completed}
          value={day.date}
          disabled={day.date > todayString ? true : false}
          onClick={(e) => onCheckBoxClicked(e, day)}
        >
          <Grid
            item
            width={"36px"}
            height={"40px"}
            // xs={matches ? 1 : 4}
            border={"#7f6751 solid 1px"}
            align={"center"}
            backgroundColor={day.completed ? "#0e534e" : ""}
            // backgroundColor={todayString === day.date ? "#0e534e" : "#ded0b9"}
          >
            {/* <Checkbox
              sx={{
                cursor: "pointer",
                margin: "2px",
                backgroundColor: todayString === day.date ? "#0e534e" : "",

                "& .MuiSvgIcon-root": {
                  fontSize: {
                    xs: "0.5",
                    sm: "0.9rem",
                    md: "1rem",
                    lg: "0.9rem",
                  },
                },
              }}
            /> */}
          </Grid>
        </ButtonBase>
      ))}
      <Grid
        item
        display={matches ? "" : "none"}
        // xs={1}
        width={"60px"}
        borderTop={"#5F4126 solid 1px"}
        borderBottom={"#5F4126 solid 1px"}
        borderLeft={"#5F4126 solid 1px"}
        borderRight={"#5F4126 solid 1px"}
        padding={"0px"}
      >
        <Box
          padding={"0px"}
          className="PERCENTBOX"
          width={`${percent}%`}
          height={"100%"}
          sx={{
            background: "green",
            display: "flex",
          }}
        >
          {" "}
          <Typography
            m={"6px"}
            align="center"
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1rem" }}
            color={theme.palette.primary.main}
          >
            {percent}%
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        display={matches ? "" : "none"}
        // xs={1}
        width={"60px"}
        borderTop={"#5F4126 solid 1px"}
        borderBottom={"#5F4126 solid 1px"}
        borderLeft={"#5F4126 solid 1px"}
        borderRight={"#5F4126 solid 1px"}
        textAlign={"center"}
      >
        <Box
          width={`${lastMonthPercent}%`}
          sx={{
            backgroundColor: "green",
            display: "flex",
            textAlign: "center",
          }}
        >
          <Typography
            m={"6px"}
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1rem" }}
            color={theme.palette.primary.main}
          >
            {lastMonthPercent}%
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        // display={matches ? "" : "none"}
        // xs={matches ? 1 : 4}
        width={"65px"}
        borderTop={"#5F4126 solid 1px"}
        borderBottom={"#5F4126 solid 1px"}
        borderLeft={"#5F4126 solid 1px"}
        borderRight={"#5F4126 solid 1px"}
        align="center"
      >
        <Button
          className="bevel-button"
          sx={{
            backgroundColor: "#960507",
            color: "white",
            cursor: "pointer",
          }}
          onClick={onDeleteHabitClicked}
        >
          <Typography
            fontSize={{
              xs: "0.6rem",
              sm: "0.7rem",
              md: "0.8rem",
              lg: "0.8rem",
            }}
          >
            {" "}
            DELETE
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Habit;
