import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  data: {},
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
      state.isOpen = true;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
