import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Color = "success" | "info" | "warning" | "error";
interface ToastMessageState {
  severity?: Color;
  message?: string;
}
interface ToastState extends ToastMessageState {
  opened: boolean;
}

const initialState: ToastState = {
  opened: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastMessageState>) => {
      state.opened = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeToast: (state) => {
      state.opened = false;
      state.message = undefined;
      state.severity = undefined;
    },
  },
});

export const { closeToast, showToast } = toastSlice.actions;

export default toastSlice.reducer;
