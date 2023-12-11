// Typescript => PayLoadAction
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  role: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
