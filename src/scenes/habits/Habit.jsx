// delete this and rename TempHabit
import FlexBetween from "components/FlexBetween";
import LinearProgressWithLabel from "components/LinearProgressWithLabel";
import React, { useEffect, useState } from "react";
import {
  useTheme,
  Button,
  Checkbox,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectAllhabits,
  selectHabitById,
  selectHabitIds,
  selectHabitsResult,
  useDeleteHabitMutation,
  useUpdateHabitMutation,
} from "./habitsApiSlice";
import { useNavigate } from "react-router-dom";

/// should recieve the habit id
const Habit = ({ habitId, week }) => {
  /// use selector to select the habit
  //console.log(habitId);
  const habit = useSelector((state) => selectHabitById(state, habitId));
  const { id, name, user, year } = habit;
  const today = new Date();
  const currentMonth = today.getMonth();
  console.log("Year from the database");
  console.log(year);
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

  const [updateHabit, { isLoading, isSuccess, isError, error }] =
    useUpdateHabitMutation();
  const [
    deleteHabit,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteHabitMutation();

  const navigate = useNavigate();
  const handleEdit = () => navigate(`/habit/${habitId}`);
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
    console.log("DATE INSIDE GET MONTH STREAK");
    console.log(date);

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
    console.log("PERCENT" + percent);

    deepCopyHabit.year[12][currentMonth] = percent;

    if (canSave) {
      console.log("SENT");
      console.log(id, name, user);
      await updateHabit({ id, name, user, year: deepCopyHabit.year });
    }
  };

  return (
    <Box width={"100%"}>
      <FlexBetween
        alignItems={"center"}
        m={"4px"}
        sx={{
          backgroundColor: theme.palette.secondary[300],
          borderRadius: "4px",
        }}
      >
        {/* NAME */}
        <Box width="auto">
          <Stack direction="column">
            <Typography
              variant="h4"
              m={"4px"}
              color={theme.palette.secondary[600]}
              fontWeight="bold"
            >
              {habit.name}
            </Typography>
            <Typography m={"4px"} color={theme.palette.primary[700]}>
              Last Month: {lastMonthPercent}
            </Typography>
            <Typography m={"4px"} color={theme.palette.primary[700]}>
              This Month: {percent}
            </Typography>
          </Stack>
        </Box>
        {/* CHECKBOXES */}
        <Stack direction="column">
          <Box
            className="Checkbox box"
            width="100%"
            display={"flex"}
            justifyContent={"center"}
            marginTop={"5px"}
            marginBottom={"5px"}
          >
            <Stack className="secondBox" direction={"row"} spacing={4.8}>
              {formattedDaysAndCompletions.map((day) => (
                <Checkbox
                  sx={{
                    backgroundColor: theme.palette.secondary[500],
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                  }}
                  onChange={handleComplete}
                  checked={day.completed}
                  disabled={day.completed}
                  value={day.date}
                  onClick={(e) => onCheckBoxClicked(e, day)}
                />
              ))}
            </Stack>
          </Box>

          {/* LINEAR PROGRESS BAR */}
          <Box width="100%">
            <LinearProgressWithLabel
              value={percent}
              sx={{
                fontSize: 28,
              }}
            ></LinearProgressWithLabel>
          </Box>
        </Stack>
        {/* DELETE BUTTON */}
        <Box mr="5px">
          <Stack direction="row" spacing={1}>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary[600],
                color: theme.palette.secondary[100],
              }}
              disabled
            >
              UPDATE
            </Button>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary[600],
                color: theme.palette.secondary[100],
              }}
              onClick={onDeleteHabitClicked}
            >
              DELETE
            </Button>
          </Stack>
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default Habit;
