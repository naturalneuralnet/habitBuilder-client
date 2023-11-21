import { createSlice } from "@reduxjs/toolkit";

// Adapted from Dave Grey's Tutorial: https://github.com/gitdagray/mern_stack_course
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

// export actions
export const { setCredentials, logOut } = authSlice.actions;

// export reducers
export default authSlice.reducer;

/// selector for the taken - auth is here bcs its the name of the slice above
export const selectCurrentToken = (state) => state.auth.token;
