import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import authReducer from "./features/auth-slice.js";

export const store = configureStore({
  reducer: {
    authReducer,
  },
});

export const useAppSelector = useSelector;
