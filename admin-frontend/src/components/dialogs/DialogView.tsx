import { Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { closeDialog } from "../../store/dialogSlice";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "../../store/react-redux-hooks";
import { DialogComponent, getDialogComponent } from "./utils/dialog.util";
import CloseIcon from "@mui/icons-material/Close";
import { blueButtonsColors } from "../common/colors/colors";
import * as React from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  dialogTitle: {
    width: "100%",
  },
  dialogTitleContainer: {
    backgroundColor: blueButtonsColors,
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    color: "white",
    fontStyle: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "30px",
    fontWeight: "bold",
  },
  iconButtonSyle: {
    color: "white",
    position: "absolute",
    right: "10px",
  }
});

const DialogView = () => {
  const { isDialogOpened, dialogTitle, dialogType } = useSelector((state) => state.dialog);
  const dialogComponent = getDialogComponent(dialogType);
  const { component, width } = dialogComponent ? dialogComponent : ({} as DialogComponent);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return (
      <Dialog open={isDialogOpened} fullWidth maxWidth={width} TransitionComponent={Transition}>
        <DialogTitle className={classes.dialogTitle} style={{ padding: "0px" }}>
          <Box className={classes.dialogTitleContainer}>
            <Box display="flex" flexGrow={1} justifyContent="center">
              {dialogTitle}
            </Box>
            <IconButton disableFocusRipple disableTouchRipple disableRipple className={classes.iconButtonSyle} onClick={handleCloseDialog}>
              <CloseIcon style={{ color: "white" }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>{component}</DialogContent>
      </Dialog>
  );
};

export default DialogView;
