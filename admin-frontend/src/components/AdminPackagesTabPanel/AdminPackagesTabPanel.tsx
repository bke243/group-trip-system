import { Box, Fab } from "@mui/material"
import { openDialog, DIALOG_TYPE } from "../../store/dialogSlice";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "../../store/react-redux-hooks";
import { useEffect } from "react";
import { fetchPackages } from "../../store/packageSlice";
import { getLocations } from "../../store/dictionarySlice";
import Packages from "../Packages/Packages";

const AdminPackagesTabPanel = () => {
  const dispatch = useDispatch();
  
  const onPackageAddClickHandler = () => {
    dispatch(openDialog({ dialogType: DIALOG_TYPE.CREATE_PACKAGE, dialogTitle: "Create Package" }))
  }

  useEffect(() => {
    dispatch(fetchPackages());
    dispatch(getLocations());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{position: 'relative', minHeight: "73vh" }}>
      <Box>
        <Packages />
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
