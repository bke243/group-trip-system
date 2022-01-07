import { Breakpoint } from "@mui/material";
import { DIALOG_TYPE } from "../../../store/dialogSlice";
import DialogCreatePackage from "../integrant/CreatePackage/CreatePackage";

export type DialogComponent = {
  width: Breakpoint | undefined;
  component: JSX.Element;
};

export const getDialogComponent = (dialogType: DIALOG_TYPE | undefined) => {
  switch (dialogType) {
    case DIALOG_TYPE.CREATE_PACKAGE: {
      const addUserDiaglog: DialogComponent = { component: <DialogCreatePackage />, width: "sm" };
      return addUserDiaglog;
    }
    default: {
      return null;
    }
  }
};
