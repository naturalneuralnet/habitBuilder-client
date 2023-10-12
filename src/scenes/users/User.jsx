import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { Grid, Typography, useTheme } from "@mui/material";

const User = ({ userId }) => {
  // select the user by id with the memoized selector
  const theme = useTheme();
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  // if the user exists go to the user's page, else return null
  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    // const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <>
        <Grid container>
          <Grid item xs={3}>
            <Typography color={theme.palette.primary.main}>
              {" "}
              {user.username}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {userRolesString}
          </Grid>
          <Grid item xs={3}>
            <button
              className="icon-button table__button"
              onClick={handleEdit}
            ></button>
          </Grid>
        </Grid>
      </>
    );
  } else return null;
};
export default User;
