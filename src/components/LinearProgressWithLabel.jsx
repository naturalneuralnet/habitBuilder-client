// import * as React from "react";
// import PropTypes from "prop-types";
// import LinearProgress from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import { useTheme } from "@emotion/react";

// function LinearProgressWithLabel(props) {
//   const theme = useTheme();
//   return (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box sx={{ width: "100%", mr: 1 }}>
//         <LinearProgress
//           variant="determinate"
//           value={props.value}
//           sx={{
//             backgroundColor: `${theme.palette.background.main},0.4)`,
//             "& .MuiLinearProgress-bar": {
//               backgroundColor: `#309951`,
//             },
//           }}
//         />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" sx={{ color: "black" }}>{`${Math.round(
//           props.value
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// LinearProgressWithLabel.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate and buffer variants.
//    * Value between 0 and 100.
//    */
//   value: PropTypes.number.isRequired,
// };

// export default LinearProgressWithLabel;
