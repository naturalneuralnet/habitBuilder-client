import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { Button, Grid, Typography, useTheme } from "@mui/material";

const User = ({ userId }) => {
  const theme = useTheme();
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  // if the user exists go to the user's page, else return null
  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

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
            <Button className="icon-button table__button" onClick={handleEdit}>
              DELETE
            </Button>
          </Grid>
        </Grid>
      </>
    );
  } else return null;
};
export default User;
