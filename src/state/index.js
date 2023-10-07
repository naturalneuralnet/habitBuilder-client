import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};

//reducers are just functions that change the globals state
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      // if state mode is light set to dark if not light keep it as light
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
