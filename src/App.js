import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { themeSettings } from "theme";
import DashLayout from "scenes/layout/DashLayout.jsx";
import NewHabit from "scenes/habits/NewHabit";
import HabitHistory from "scenes/habits/HabitHistory";
import Prefetch from "scenes/auth/Prefetch";
import UsersList from "scenes/users/usersList";
import HabitsList from "scenes/habits/HabitsList";
import Layout from "scenes/layout/Layout";
import Login from "scenes/auth/Login";
import PersistLogin from "scenes/auth/PersistLogin";
import RequireAuth from "scenes/auth/RequireAuth";
import { ROLES } from "config/roles";
import Intro from "scenes/auth/Intro";
import Signup from "scenes/auth/Signup";
import CheckEmail from "scenes/auth/CheckEmail";

function App() {
  const mode = useSelector((state) => state.global.mode);
  // creating theme and passing in settings
  const theme = responsiveFontSizes(
    useMemo(() => createTheme(themeSettings(mode)), [mode])
  );

  // pass in the theme to the theme provider
  // The first route with layout ensures that every page has the layout on it
  // so every page will have the navbar
  // defualt page will take you to the dashboard

  // add title
  document.title = "Habit Builder";

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="auth/verify/:confirmationCode" element={<Intro />} />
              <Route path="login/check/:userEmail" element={<CheckEmail />} />
              {/* <Route path="login" element={<Login />} /> */}
              <Route path="signup" element={<Signup />} />
              <Route element={<PersistLogin />}>
                <Route
                  element={
                    <RequireAuth allowedRoles={[...Object.values(ROLES)]} />
                  }
                >
                  <Route element={<Prefetch />}>
                    <Route path="dash" element={<DashLayout />}>
                      {/* <Route index element={<Welcome />} /> */}
                      <Route path="habits" element={<HabitsList />} />
                      <Route path="new" element={<NewHabit />} />{" "}
                      <Route path="history" element={<HabitHistory />} />
                      <Route
                        element={<RequireAuth allowedRoles={[ROLES.admin]} />}
                      >
                        <Route path="users">
                          <Route index element={<UsersList />}></Route>
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
