import { makeStyles } from '@mui/styles';
import { Box } from "@mui/material";
import ApplicationBar from "./integrant/ApplicationBar/ApplicationBar";

const useStyles  = makeStyles(() => ({
  toolbarContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  }
}))


const ToolbarApp = () => {
  const classes = useStyles();
  return (
    <Box className={classes.toolbarContainer}>
      <ApplicationBar />
    </Box>
  );
};

export default ToolbarApp;