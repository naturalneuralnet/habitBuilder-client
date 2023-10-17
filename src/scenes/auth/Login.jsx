import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useGuestMutation } from "./authApiSlice";
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Checkbox,
} from "@mui/material";
// import { LottieGif } from "components/LottieGif";
import leather from "../../assets/basketball.png";
import new_card from "../../assets/newest_card.png";
import nat from "../../assets/green-frame-nature.gif";

// Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
const Login = () => {
  // use to set focus on user input
  const userRef = useRef();
  const errRef = useRef();
  // local state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  /// use navigate and use dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /// login fucntion from mutation
  const [login, { isLoading }] = useLoginMutation();

  const [guest] = useGuestMutation();
  /// handles the user ref, puts the focus on the username field
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // clear out the error after its read
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  /// async function
  /// prevent default so it doesnt reload
  // try catch block and recieve an error in the catch
  /// get the acccess token form the login hook and pass in username and password and unwrap to cathc the err
  // dispatch set credentials with our access token
  /// clearing setUsername and password
  /// then we have navigate to take us to the dash if we login
  /// the cathc block if we have dont have an error then its no server response
  /// check the errors and reply or set the error message
  /// then we have the err Ref so the focus is on the error
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));

      setUsername("");
      setPassword("");

      navigate("/dash/habits");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
        // } else if (err.status === 401) {
        //   setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();
    // login as a guest user
    try {
      const { accessToken } = await guest({
        username: "guest",
        pwd: "none",
        userEmail: "none",
      }).unwrap();
      dispatch(setCredentials({ accessToken }));

      navigate("/dash/habits");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
        // } else if (err.status === 401) {
        //   setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };
  /// handles the input
  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  /// hanlde toggle of persist
  const handleToggle = () => setPersist((prev) => !prev);

  /// err class that shows err message when it exists
  const errClass = errMsg ? "errmsg" : "offscreen";
  /// is loading state until its finsihed loading
  if (isLoading) return <p>Loading...</p>;

  /// content
  ///section and header
  /// form input for username and password, applying userref and state username to value
  /// passowrd input type is password
  // aria live assertive for error so a screen reader will read it

  const content = (
    <>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        height={"100%"}
      >
        <Box
          width={{ xs: "100%", sm: "50%", md: "40%", lg: "30%" }}
          sx={{
            background: "#ded0b9",
            backgroundImage: `url(${new_card})`,
            backgroundSize: "repeat",
          }}
        >
          <Box m={"100px"}>
            <Box display={"flex"} justifyContent={"center"}>
              <Typography
                variant="h1"
                color="#180e0e"
                fontWeight="bold"
                sx={{ mb: "10px" }}
                gutterBottom
              >
                LOGIN
              </Typography>
            </Box>
            <Box
              m={"3rem"}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    ref={userRef}
                    value={username}
                    onChange={handleUserInput}
                    autoComplete="off"
                    variant="standard"
                    label="Username"
                    color="warning"
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
                    Username
                  </TextField>
                  <TextField
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={password}
                    required
                    variant="standard"
                    color="warning"
                    label="Password"
                    sx={{
                      mb: "20px",
                      width: "300px",
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
                    Password
                  </TextField>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography
                      ref={errRef}
                      className={errClass}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography color={"#180e0e"}>
                      Trust This Device{" "}
                      <Checkbox
                        onChange={handleToggle}
                        checked={persist}
                      ></Checkbox>
                    </Typography>
                  </Box>
                  <Button
                    m={"5px"}
                    variant="contained"
                    className="bevel-button"
                    sx={{
                      backgroundColor: "#391e1b",
                      color: "white",
                      fontSize: "18px",
                      cursor: "pointer",
                      borderRadius: "1px",
                    }}
                    type="submit"
                    onClick={handleSubmit}
                    onTouchStart={handleSubmit}
                  >
                    LOG IN
                  </Button>
                  {/* <IconButton href="/">
                    <CottageIcon></CottageIcon>
                  </IconButton> */}
                  <Button
                    m={"5px"}
                    className="bevel-button"
                    variant="contained"
                    sx={{
                      backgroundColor: "#391e1b",
                      color: "white",
                      fontSize: "18px",
                      cursor: "pointer",
                      borderRadius: "1px",
                    }}
                    type="submit"
                    onClick={handleGuestSubmit}
                    // onTouchStart={handleSubmit}
                  >
                    LOG IN As GUEST
                  </Button>
                </Stack>
              </form>
            </Box>
          </Box>
        </Box>
        <Box
          width={{ xs: "100%", sm: "50%", md: "60%", lg: "70%" }}
          display={"flex"}
          justifyContent={"center"}
          sx={{
            background: "#001f1e",
            backgroundImage: `url(${leather})`,
            backgroundSize: "repeat",
          }}
        >
          <Box m={"100px 50px "} width={"50%"} height={"60%"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Typography
                className="gold"
                variant="h1"
                // color="white"
                fontWeight="bold"
                sx={{ mb: "5px" }}
                align="center"
              >
                Build Habits
              </Typography>
              <Typography
                className="gold"
                variant="h1"
                // color="white"
                fontWeight="bold"
                sx={{ mb: "5px" }}
                align="center"
              >
                Even if you miss a day
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} padding={"10px"}>
              {/* <LottieGif></LottieGif> */}
              <img src={nat} alt="nature_gif"></img>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                variant="contained"
                className="bevel-button"
                sx={{
                  backgroundColor: "#391e1b",
                  color: "white",
                  fontSize: "18px",
                  fontFamily: "Italiana",
                  borderRadius: "1px",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/signup"
                >
                  SIGN UP
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
  return content;
};

export default Login;
