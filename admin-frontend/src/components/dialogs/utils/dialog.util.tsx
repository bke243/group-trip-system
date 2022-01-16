import { Breakpoint } from "@mui/material";
import { DIALOG_TYPE } from "../../../store/dialogSlice";
import DialogCreatePackage from "../integrant/CreatePackage/CreatePackage";
import DeletePackage from "../integrant/DeletePackage/DeletePersonImage";

export type DialogComponent = {
  width: Breakpoint | undefined;
  component: JSX.Element;
};

export const getDialogComponent = (dialogType: DIALOG_TYPE | undefined) => {
  switch (dialogType) {
    case DIALOG_TYPE.CREATE_PACKAGE: {
      const createPackage: DialogComponent = { component: <DialogCreatePackage />, width: "sm" };
      return createPackage;
    }
    case DIALOG_TYPE.DELETE_PACKAGE: {
      const deletePackage: DialogComponent = { component: <DeletePackage />, width: "sm" };
      return deletePackage;
    }
    default: {
      return null;
    }
  }
};
