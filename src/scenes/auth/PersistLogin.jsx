import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

// Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
const PersistLogin = () => {
  /// persist

  const [persist] = usePersist(); /// the current token

  const token = useSelector(selectCurrentToken); /// for react 18 handling strict mode

  const effectRan = useRef(false); ///

  const [trueSuccess, setTrueSuccess] = useState(false); /// refresh mutation, isUninationalized - it hasnt been called yet

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation(); /// for dealing with strict mode

  useEffect(() => {
    /// in strict mode this is true in development will run if not in development mode

    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      /// verify the refresh token, doesn't get the refresh token just checks that its there?

      const verifyRefreshToken = async () => {
        try {
          //const response =

          await refresh(); //const { accessToken } = response.data /// yes the data has gotten

          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      }; /// if there is no token then verify the refresh token to get a new token

      if (!token && persist) verifyRefreshToken();
    } /// strictmode is set to true so its true the next time

    return () => (effectRan.current = true); // eslint-disable-next-line
  }, []);

  let content; /// if no persist, says not logged in

  if (!persist) {
    // persist: no

    content = <Outlet />;
  } /// loading when there is no token
  else if (isLoading) {
    //persist: yes, token: no

    content = <p>Loading...</p>; /// error if there is an error with loggin in
  } else if (isError) {
    //persist: yes, token: no

    content = (
      <p className="errmsg">
        {`${error.data?.message} - `} <Link to="/">Please login again</Link>.{" "}
      </p>
    );
  } // we have a token and persist is yes
  else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes

    content = <Outlet />;
  } // could be unitialized
  else if (token && isUninitialized) {
    //persist: yes, token: yes

    console.log(isUninitialized);

    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
