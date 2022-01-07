import { useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Button } from "@mui/material";
import { useDispatch } from "../../store/react-redux-hooks";
import { openDialog, DIALOG_TYPE } from "../../store/dialogSlice";


const useStyles  = makeStyles(() => ({
  panelContainer: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  paperStyles: {
    width: "100%",
    minHeight: "80vh" 
  }
}))


const AdminPanel = () => {
  const [value, setValue] = useState('1');
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onPackageAddClickHandler = () => {
    dispatch(openDialog({ dialogType: DIALOG_TYPE.CREATE_PACKAGE, dialogTitle: "Create Package" }))
  }

  return (
    <Box className={classes.panelContainer}>
      <Paper elevation={3} className={classes.paperStyles}>
        <TabContext value={value} >
          <Box  sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Packages" value="1" />
              <Tab label="Support" value="2" />
              <Tab label="Manage users" value="3" disabled/>
            </TabList>
          </Box>
          <TabPanel value="1">
            <Button onClick={onPackageAddClickHandler}>Create package</Button>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Paper>
    </Box>
  );
};

export default AdminPanel;