import Box from "@mui/material/Box";
import NewHabitForm from "./NewHabitForm";
import useAuth from "hooks/useAuth";
import { useTheme } from "@emotion/react";
import { Paper } from "@mui/material";
import leather from "../../assets/basketball.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,

  background: "#0e534e",
  backgroundImage: `url(${leather})`,
  backgroundSize: "repeat",
  border: "1px solid #3e2723",
  boxShadow: 24,
};

export default function NewHabitModal() {
  const { userId } = useAuth();

  if (!userId?.length) return <p>Not Currently Available</p>;
  return (
    <>
      <Box sx={style}>
        <Paper
          sx={{
            backgroundColor: "#ded0b9",
            width: "350px",
            height: "40%",
            margin: "auto",
            borderRadius: "0px",
          }}
          elevation={6}
        >
          <NewHabitForm user={userId}></NewHabitForm>
        </Paper>
      </Box>
    </>
  );
}
