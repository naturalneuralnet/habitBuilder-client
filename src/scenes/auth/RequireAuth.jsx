import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// Courtesy of Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  // gets the current users rules
  const { roles } = useAuth();

  /// if the user has the allowed role show them it
  /// if not they need to go to login
  // outlet is all of the children
  /// replace this ensures the back button works

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
