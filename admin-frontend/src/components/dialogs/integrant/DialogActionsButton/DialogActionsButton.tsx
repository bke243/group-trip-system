import { Button, DialogActions } from "@mui/material";
import { closeDialog } from "../../../../store/dialogSlice";
import { useDispatch } from "../../../../store/react-redux-hooks";

interface DialogActionsButtonProps {
  submiText: string;
  onSubmitClick?: () => void;
  disabled?: boolean;
}

const DialogActionsButton = (props: DialogActionsButtonProps) => {
  const { onSubmitClick, submiText, disabled } = props;
  const dispatch = useDispatch();
  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };
  return (
    <DialogActions style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={onSubmitClick} disabled={disabled} variant="contained" color="success" style={{ color: "white" }} type="submit">
        {submiText}
      </Button>
      <Button onClick={handleCloseDialog} variant="contained" style={{ color: "white", backgroundColor: "red" }}>
        Cancel
      </Button>
    </DialogActions>
  );
};

export default DialogActionsButton;
