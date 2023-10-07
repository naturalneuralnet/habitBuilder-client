import LinearProgressWithLabel from "components/LinearProgressWithLabel";
import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  useTheme,
  Button,
  Checkbox,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectHabitById,
  useDeleteHabitMutation,
  useUpdateHabitMutation,
} from "./habitsApiSlice";

/// should recieve the habit id
const TempHabit = ({ habitId, week }) => {
  const matches = useMediaQuery("(min-width:900px)");
  /// use selector to select the habit
  //console.log(habitId);
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

  // const navigate = useNavigate();
  const handleComplete = (e) => setDate(e.target.value);
  const theme = useTheme();

  /// local state, not sure I need this but whatever
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

  /// okay i need to get the userid from the habit
  /// and the year from the habit
  /// check the dates on the year and disable the checkbox if that data is in there
  /// then create a new year which is updated
  /// then send that to the backend

  const getDays = (year, month) => new Date(year, month, 0).getDate();

  const getMonthStreak = (date) => {
    /// get the current month or the month from that date
    /// gte the lenght of the month

    const month = currentMonth;

    const completedDaysLength = habit.year[month].length;
    // const month = d.slice(3, 5);
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
    <Grid container rowSpacing={1}>
      {/* NAME */}
      <Grid
        item
        xs={matches ? 2 : 4}
        borderTop={"#5F4126 solid 1px"}
        borderBottom={"#5F4126 solid 1px"}
        borderRight={"#5F4126 solid 1px"}
        borderLeft={"#5F4126 solid 1px"}
      >
        <Stack direction="column">
          <Typography
            fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
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
        <Grid
          item
          xs={matches ? 1 : 4}
          borderTop={"#5F4126 solid 1px"}
          borderBottom={"#5F4126 solid 1px"}
          borderLeft={"#5F4126 solid 1px"}
          borderRight={"#5F4126 solid 1px"}
          align={"center"}
          backgroundColor={todayString === day.date ? "#001f1e" : "#ded0b9"}
        >
          <Checkbox
            sx={{
              cursor: "pointer",
              margin: "5px",
              backgroundColor:
                todayString === day.date
                  ? "#0e534e"
                  : theme.palette.primary.main,

              "& .MuiSvgIcon-root": {
                fontSize: { xs: "0.5", sm: "0.9rem", md: "1rem", lg: "1.5rem" },
              },
            }}
            onChange={handleComplete}
            checked={day.completed}
            disabled={day.completed}
            value={day.date}
            onClick={(e) => onCheckBoxClicked(e, day)}
          />
        </Grid>
      ))}

      <Grid
        item
        display={matches ? "" : "none"}
        xs={1}
        borderTop={"#5F4126 solid 1px"}
        borderBottom={"#5F4126 solid 1px"}
        borderLeft={"#5F4126 solid 1px"}
        borderRight={"#5F4126 solid 1px"}
      >
        <Typography
          m={"4px"}
          align="center"
          fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
          color={theme.palette.primary.main}
        >
          {percent}%
        </Typography>
      </Grid>
      <Grid
        item
        display={matches ? "" : "none"}
        xs={1}
        borderTop={"#5F4126 solid 1px"}
        borderBottom={"#5F4126 solid 1px"}
        borderLeft={"#5F4126 solid 1px"}
        borderRight={"#5F4126 solid 1px"}
        align="center"
      >
        <Typography
          m={"4px"}
          fontSize={{ sm: "0.9rem", md: "1rem", lg: "1.3rem" }}
          color={theme.palette.primary.main}
        >
          {lastMonthPercent}%
        </Typography>
      </Grid>
      <Grid
        item
        // display={matches ? "" : "none"}
        xs={matches ? 1 : 4}
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
      <Grid xs={10} display={matches ? "" : "none"}>
        <LinearProgressWithLabel value={percent}></LinearProgressWithLabel>
      </Grid>
    </Grid>
  );
};

export default TempHabit;
