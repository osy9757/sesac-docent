import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import authReducer from "./features/auth-slice.js";
import modalReducer from "./features/modal-slice.js";

export const store = configureStore({
  reducer: {
    authReducer,
    modalReducer,
  },
});

export const useAppSelector = useSelector;
