// can delete this
// import React from "react";
// import Header from "components/Header";
// import { Box, Paper, useTheme } from "@mui/material";
// import { Link } from "react-router-dom";
// import useAuth from "hooks/useAuth";

// const Welcome = () => {
//   const theme = useTheme();
//   const { username, isAdmin } = useAuth();
//   const date = new Date();
//   const today = new Intl.DateTimeFormat("en-US", {
//     dateStyle: "full",
//     timeStyle: "long",
//   }).format(date);

//   return (
//     <Box>
//       <Box m={"1rem 2rem"}>
//         <Header title={"Welcome"}></Header>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           width: "100%",
//           height: "100%",

//           "& > :not(style)": {
//             m: 1,
//             width: "100%",
//           },
//         }}
//       >
//         <Paper
//           sx={{
//             backgroundColor: theme.palette.neutral.main,
//             padding: "10px",
//             border: "white solid 1px",
//           }}
//           elevation={4}
//         >
//           <section className="welcome">
//             <p>{today}</p>

//             <h1>Welcome! {username}</h1>

//             <p>
//               <Link to="/dash/habits">View Habits</Link>
//             </p>

//             <p>
//               <Link to="/dash/new">Add New Habits</Link>
//             </p>

//             {isAdmin && (
//               <p>
//                 <Link to="/dash/users">View User Settings</Link>
//               </p>
//             )}

//             {/* <p>
//           <Link to="/dash/users/new">Add New User</Link>
//         </p> */}
//           </section>
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default Welcome;
