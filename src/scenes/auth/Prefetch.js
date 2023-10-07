import { store } from "index";
import { habitsApiSlice } from "../habits/habitsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

/// Not fully sure what this does, I think it calls the redux reducers to fetch data before the app loads
const Prefetch = () => {
  useEffect(() => {
    const notes = store.dispatch(
      habitsApiSlice.endpoints.getAllHabits.initiate()
    );
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    console.log(users);
    return () => {
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
