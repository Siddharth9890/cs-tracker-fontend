import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./users/userReducer";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV === "production" ? false : true,
});
