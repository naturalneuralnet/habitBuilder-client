import { useSelector } from "react-redux";

import { selectCurrentToken } from "scenes/auth/authSlice";

import jwtDecode from "jwt-decode";

// create a new hook called useAuth
// import jwtDecode and select current token
// get the current token
// the default value is employee
// return empty usernaame and roles and booleans if there is no token
// if there is a token
// decode with jwt decode
// and check the roles inside the roles array inside userInfo
// return those if they are there
// set the status for whichever role is highest,

/// courtesy of Dave Grey's Tutorial https://github.com/gitdagray/mern_stack_course)
const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;

  let status = "user";

  if (token) {
    const decoded = jwtDecode(token);

    const { userId, username, roles } = decoded.UserInfo;

    isAdmin = roles.includes("admin");

    if (isAdmin) status = "admin";

    return { userId, username, roles, status, isAdmin };
  }

  return { userId: "", username: "", roles: [], isAdmin, status };
};

export default useAuth;
