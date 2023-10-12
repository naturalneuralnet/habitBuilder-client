import React, { useEffect, useState } from "react";
import { useAddNewHabitMutation } from "./habitsApiSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Box, Stack, Typography, Button } from "@mui/material";
import { useTheme } from "@emotion/react";

const NewHabitForm = ({ user, open, close }) => {
  const [addNewHabit, { isLoading, isSuccess }] = useAddNewHabitMutation();

  const navigate = useNavigate();
  const theme = useTheme();

  //// local state
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(user);

  // if creating a user is successful it will empty out the local state
  /// and navigate back to the users page

  useEffect(() => {
    if (isSuccess) {
      console.log("Resetting name");
      setName("");
      navigate("/dash/habits");
    }
  }, [isSuccess, navigate]);

  // handlers to handle the changes

  const handleOnNameChange = (e) => setName(e.target.value);

  // can save is an array, checking if all of them are true using .every with boolean and checking if we are not loding

  const canSave = [name, userId].every(Boolean) && !isLoading;

  /// then we call the addnewuser function and add the new user

  const onSaveHabitClicked = async (e) => {
    e.preventDefault();
    console.log("save habit clicked");
    if (canSave) {
      await addNewHabit({ name, user: userId });
      close(true);
    }
  };
  /// classes to apply depending on how valid things are
  /// the form input incomplete class will highlight them in read if the inout is not valid

  /// error message are at the top of the form
  /// then tehre is the form, onsubmit calls onsaveuserlcicked
  /// button to save is not shown then the button is disabled
  /// label for input for usernmae
  // input for username
  // same for password
  // then for the roles, multiple is set to true so you can select multiple values with three visible so there is no dropdown

  const content = (
    <>
      <Box
        m={"3rem"}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box m={"3rem"}>
          <form onSubmit={onSaveHabitClicked}>
            <Stack
              spacing={3}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                gutterBottom
                m={"5px"}
                variant="h3"
                color={theme.palette.primary.main}
              >
                Add Habit
              </Typography>
              {/* <Typography
                gutterBottom
                m={"5px"}
                variant="h4"
                color={theme.palette.primary.main}
              >
                Build up habits!
              </Typography> */}
              {/* <Divider
                className="divider"
                variant="middle"
                sx={{
                  borderColor: theme.palette.primary.main,
                  width: "100%",
                }}
              ></Divider> */}
              <Typography
                gutterBottom
                m={"5px"}
                variant="h5"
                color={theme.palette.primary.main}
              >
                Name this habit
              </Typography>
              <TextField
                m={"5px"}
                color={"warning"}
                size="small"
                variant="standard"
                onChange={handleOnNameChange}
                sx={{
                  "& label": {
                    color: "#5F4126",
                  },
                  "& label.Mui-focused": {
                    color: "#5F4126",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#001f1e",
                  },

                  "& .MuiInputBase-root:hover:before": {
                    borderBottom: "2px solid #5F4126 !important",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#5F4126",
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: 20,
                    color: "#5F4126",
                  },
                }}
                // font size of input text
                InputLabelProps={{
                  style: { fontSize: 20 },
                }} // font size of input label
              >
                Name
              </TextField>
              {/* <Typography m={"5px"} gutterBottom>
                User ID
              </Typography>
              <TextField m={"5px"} defaultValue={userId}>
                UserId
              </TextField> */}
              <Button
                m={"5px"}
                gutterBottom
                variant="contained"
                className="bevel-button"
                type="submit"
                disabled={!canSave}
                sx={{
                  backgroundColor: "#391e1b",
                  color: "white",
                  fontSize: "18px",
                  cursor: "pointer",
                  borderRadius: "1px",
                }}
              >
                SUBMIT
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </>
  );
  return content;
};

export default NewHabitForm;
