import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// Courtesy of Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  // gets the current users rules
  const { roles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
