import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum DIALOG_TYPE {
  CREATE_PACKAGE,
  ADD_PICTURE_FORM
}

interface DialogState {
  isDialogOpened: boolean;
  dialogType?: DIALOG_TYPE;
  dialogTitle?: string;
}

const initialState: DialogState = {
  isDialogOpened: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    closeDialog: (state) => {
      state.isDialogOpened = false;
      state.dialogTitle = undefined;
      state.dialogType = undefined;
    },
    openDialog: (state, action: PayloadAction<{ dialogType: DIALOG_TYPE; dialogTitle?: string }>) => {
      state.isDialogOpened = true;
      state.dialogTitle = action.payload.dialogTitle;
      state.dialogType = action.payload.dialogType;
    },
  },
});

export const { closeDialog, openDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
