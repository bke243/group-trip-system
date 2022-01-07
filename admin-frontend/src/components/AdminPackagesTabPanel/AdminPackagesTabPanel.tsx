import { Box, Fab } from "@mui/material"
import { openDialog, DIALOG_TYPE } from "../../store/dialogSlice";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "../../store/react-redux-hooks";

const AdminPackagesTabPanel = () => {
  const dispatch = useDispatch();
  const onPackageAddClickHandler = () => {
    dispatch(openDialog({ dialogType: DIALOG_TYPE.CREATE_PACKAGE, dialogTitle: "Create Package" }))
  }
  return (
    <Box sx={{position: 'relative', minHeight: "73vh" }}>
      <Box>
        Card will be here
      </Box>
      <Box>
        <Fab onClick={onPackageAddClickHandler} color="primary" aria-label="add" sx={{position: 'absolute', bottom: 16, right: 16}}>
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default AdminPackagesTabPanel;
