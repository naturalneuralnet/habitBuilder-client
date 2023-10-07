import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state/index.js";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query/";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { apiSlice } from "state/apiSlice";
import authReducer from "scenes/auth/authSlice";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },

  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
