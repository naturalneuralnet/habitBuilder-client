import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, TextField, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import { useSignupMutation } from "./authApiSlice";
import { LottieGif } from "components/LottieGif";
import { Link, useNavigate } from "react-router-dom";
import leather from "../../assets/basketball.png";
import nat from "../../assets/green-frame-nature.gif";
import new_card from "../../assets/newest_card.png";
const ColorButton = styled(Button)(({ theme }) => ({
  background: "#1484a6",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: "5px",
  width: "200px",
}));

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Signup = () => {
  const userRef = useRef();
  const errRef = useRef();
  const successRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  /// err message
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [signup, { isSuccess }] = useSignupMutation();

  /// err class that shows err message when it exists
  const errClass = errMsg ? "errmsg" : "offscreen";
  // success class
  const successClass = isSuccess ? "success" : "offscreen";
  // // focus on the current thing
  useEffect(() => {
    userRef.current.focus();
  }, []);

  /// checking if the username is valid
  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  /// check if the password and matching password is valid
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    if (matchPwd) {
      setValidMatch(pwd === matchPwd);
    }
  }, [pwd, matchPwd]);

  //// check if the email is valid

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(userEmail));
  }, [userEmail]);

  /// reste error message
  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd, userEmail]);

  /// const handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    /// if the signup button is enabled with the javascript hack

    const userV = USER_REGEX.test(username);
    const pwdV = PWD_REGEX.test(pwd);

    if (!userV || !pwdV) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      /// dispatch to register or signup url
      /// should get an accesstoken or verification token back
      /// catch and display any errors
      /// cleanup the variables by clearing them
      // the unwrap is needed for the error to be caught
      const { data } = await signup({ username, userEmail, pwd }).unwrap();

      // console.log("IS SUCCESS");
      // console.log(isSuccess);
      setSuccessMsg(data.message);
      // setTimeout(() => {
      // }, 1000);
      navigate(`/login/check/${userEmail}`);
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 409) {
        setErrMsg(
          "This email is already associated with an account. Please use a different one."
        );
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const content = (
    <>
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row", md: "row", lg: "row" }}
        height={"100%"}
      >
        <Box
          width={{ xs: "100%", sm: "50%", md: "60%", lg: "70%" }}
          sx={{
            background: "#001f1e",
            backgroundImage: `url(${leather})`,
            backgroundSize: "repeat",
          }}
        >
          <Box m={"120px auto auto auto"} width={"60%"} height={"30%"}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Typography
                variant="h1"
                color="white"
                fontWeight="bold"
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
              <img src={nat} alt="nature_gif"></img>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#180e0e",
                  color: "white",
                  fontSize: "20px",
                  borderRadius: "1px",
                }}
              >
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  LOGIN
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          width={{ xs: "100%", sm: "40%", md: "40%", lg: "30%" }}
          display={"flex"}
          justifyContent={"center"}
          sx={{
            background: "#ded0b9",
            backgroundImage: `url(${new_card})`,
            backgroundSize: "repeat",
          }}
        >
          <Box m={"100px"} p={"10px 0px"}>
            <Stack>
              <Box display={"flex"} justifyContent={"center"}>
                <Typography
                  variant="h1"
                  color="#180e0e"
                  fontWeight="bold"
                  sx={{ mb: "10px" }}
                  gutterBottom
                >
                  {" "}
                  SIGN UP
                </Typography>
              </Box>
              {/* <Box display={"flex"} justifyContent={"center"}>
                <ColorButton>
                  <img
                    alt="google img"
                    height="15px"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  ></img>
                  {"    "}
                  <Typography color={"white"} m={"0 0 0 4px "}>
                    With Google
                  </Typography>
                </ColorButton>
              </Box> */}
              {/* <Box display={"flex"} justifyContent={"center"}>
                <Typography
                  variant="h3"
                  color="#180e0e"
                  fontWeight="bold"
                  sx={{ mb: "10px", mt: "10px" }}
                  gutterBottom
                >
                  {" "}
                  -OR-
                </Typography>
              </Box> */}
              <Box color={"#180e0e"}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      variant="standard"
                      label="Username"
                      ref={userRef}
                      value={username}
                      gutterBottom
                      color={
                        userFocus && username && validName ? "success" : "error"
                      }
                      sx={{
                        mb: "20px",
                        width: "300px",
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#001f1e",
                        },
                      }}
                      inputProps={{ style: { color: "#180e0e", fontSize: 20 } }} // font size of input text
                      InputLabelProps={{
                        style: { color: "#180e0e", fontSize: 20 },
                      }} // font size of input label
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setUserFocus(true)}
                      onBlue={() => setUserFocus(false)}
                      helperText={
                        userFocus && username && !validName
                          ? "4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed."
                          : ""
                      }
                    >
                      Username
                    </TextField>
                    {validName ? (
                      <CheckIcon className="valid"></CheckIcon>
                    ) : (
                      <ClearIcon className="invalid"></ClearIcon>
                    )}
                  </div>
                  <div>
                    <TextField
                      variant="standard"
                      label="Email Address"
                      color={
                        emailFocus && userEmail && validEmail
                          ? "success"
                          : "error"
                      }
                      value={userEmail}
                      helperText={
                        emailFocus && userEmail && !validEmail
                          ? "This is not a valid email address"
                          : ""
                      }
                      gutterBottom
                      sx={{
                        mb: "20px",
                        width: "300px",
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#001f1e",
                        },
                      }}
                      inputProps={{ style: { color: "#180e0e", fontSize: 20 } }} // font size of input text
                      InputLabelProps={{
                        style: { color: "#180e0e", fontSize: 20 },
                      }} // font size of input label
                      fullWidth
                      onChange={(e) => setUserEmail(e.target.value)}
                      onFocus={() => setEmailFocus(true)}
                      onBlue={() => setEmailFocus(false)}
                    >
                      Email Address
                    </TextField>
                    {validEmail ? (
                      <CheckIcon className="valid"></CheckIcon>
                    ) : (
                      <ClearIcon className="invalid"></ClearIcon>
                    )}
                  </div>
                  <div>
                    <TextField
                      variant="standard"
                      gutterBottom
                      color={pwdFocus && pwd && validPwd ? "success" : "error"}
                      sx={{
                        mb: "20px",
                        width: "300px",
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#001f1e",
                        },
                      }}
                      value={pwd}
                      type="password"
                      label="Password"
                      inputProps={{ style: { color: "#180e0e", fontSize: 20 } }} // font size of input text
                      InputLabelProps={{
                        style: { color: "#180e0e", fontSize: 20 },
                      }} // font size of input label
                      fullWidth
                      onChange={(e) => setPwd(e.target.value)}
                      onFocus={() => setPwdFocus(true)}
                      onBlue={() => setPwdFocus(false)}
                      helperText={
                        pwdFocus && pwd && !validPwd
                          ? "8 to 24 characters.  Must include uppercase and lowercase letters, a number and a special character. Allowed special characters:!@#%$"
                          : ""
                      }
                    >
                      Password
                    </TextField>
                    {validPwd ? (
                      <CheckIcon className="valid"></CheckIcon>
                    ) : (
                      <ClearIcon className="invalid"></ClearIcon>
                    )}
                  </div>
                  <div>
                    <TextField
                      variant="standard"
                      gutterBottom
                      sx={{
                        mb: "20px",
                        width: "300px",
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#001f1e",
                        },
                        "& .MuiInputBase-root:hover:before": {
                          borderBottom: "2px solid #5F4126 !important",
                        },
                      }}
                      color={
                        matchFocus && matchPwd && validMatch
                          ? "success"
                          : "error"
                      }
                      value={matchPwd}
                      type="password"
                      label="Password"
                      inputProps={{ style: { color: "#180e0e", fontSize: 20 } }} // font size of input text
                      InputLabelProps={{
                        style: { color: "#180e0e", fontSize: 20 },
                      }} // font size of input label
                      fullWidth
                      onChange={(e) => setMatchPwd(e.target.value)}
                      onFocus={() => setMatchFocus(true)}
                      onBlue={() => setMatchFocus(false)}
                      helperText={
                        matchFocus && matchPwd && !validMatch
                          ? "Must match the first password input field"
                          : ""
                      }
                    >
                      Confirm Password:
                    </TextField>
                    {validMatch ? (
                      <CheckIcon className="valid"></CheckIcon>
                    ) : (
                      <ClearIcon className="invalid"></ClearIcon>
                    )}
                  </div>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Stack gap={2}>
                      <Typography
                        ref={errRef}
                        className={errClass}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </Typography>
                      <Typography
                        ref={successRef}
                        className={successClass}
                        aria-live="assertive"
                      >
                        {successMsg}
                      </Typography>
                    </Stack>
                    <Button
                      disabled={
                        (!validName,
                        !isSuccess,
                        !validEmail,
                        !validPwd,
                        !validMatch ? true : false)
                      }
                      sx={{
                        backgroundColor: "#180e0e",
                        color: "white",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      variant="contained"
                      type="submit"
                    >
                      SIGN UP
                    </Button>
                  </Box>
                </form>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
  return content;
};

export default Signup;
