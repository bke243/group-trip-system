import { DialogActions, Button, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { closeDialog } from "../../../../store/dialogSlice";
import { deletePackage } from "../../../../store/packageSlice";
import { useDispatch, useSelector } from "../../../../store/react-redux-hooks";
// here
const DeletePersonImage = () => {
  const dispatch = useDispatch();
  const { deletePackageId } = useSelector((state) => state.package);
  const navigate = useNavigate();
  const closeDeleteImageDialog = () => {
    dispatch(closeDialog());
  };

  const navigateCallBack = () => navigate("/");

  const deletePersonhandle = () => {
    closeDialog();
    dispatch(deletePackage({ packageId: deletePackageId!, packageNavigateCallBack: navigateCallBack }));
  };

  return (
    <Box>
      <Box minHeight="100px" display="flex" justifyContent="center" alignItems="center">
        <Typography>Are you sure you would like to delete the package ?</Typography>
      </Box>
      <DialogActions style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" style={{ color: "white" }} type="submit" onClick={deletePersonhandle}>
          Delete
        </Button>
        <Button variant="contained" style={{ color: "white", backgroundColor: "#f44336" }} onClick={closeDeleteImageDialog}>
          Cancel
        </Button>
      </DialogActions>{" "}
    </Box>
  );
};

export default DeletePersonImage;
