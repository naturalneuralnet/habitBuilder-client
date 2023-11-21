import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { Grid, Paper, Box, useTheme, Typography } from "@mui/material";
import new_card from "../../assets/newest_card.png";
import leather from "../../assets/basketball.png";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  const theme = useTheme();

  let content;
  // if is loading then put a loading para
  if (isLoading) content = <p>Loading...</p>;
  /// if there is an error write the error message
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  // if it is successful
  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <Box m={"1rem 2rem"}>
        {" "}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            height: "100%",
            marginTop: "5px",
            background: theme.palette.primary.main,
            backgroundImage: `url(${leather})`,
            backgroundSize: "repeat",
            padding: "10px",
            "& > :not(style)": {
              width: "100%",
              height: "59vh",
            },
          }}
        >
          <Paper
            sx={{
              background: "#ded0b9",
              backgroundImage: `url(${new_card})`,
              backgroundSize: "repeat",
              padding: "10px",
              border: "#5F4126 solid 1px",
            }}
            elevation={4}
          >
            <Grid container>
              <Grid item xs={3}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "12px", sm: "14px", md: "18px", lg: "22px" }}
                  color={theme.palette.primary.main}
                >
                  Username
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "12px", sm: "14px", md: "18px", lg: "22px" }}
                  color={theme.palette.primary.main}
                >
                  Roles
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "12px", sm: "14px", md: "18px", lg: "22px" }}
                  color={theme.palette.primary.main}
                >
                  Edit
                </Typography>
              </Grid>
              {tableContent}
            </Grid>
          </Paper>
        </Box>
      </Box>
    );
  }

  return content;
};
export default UsersList;
