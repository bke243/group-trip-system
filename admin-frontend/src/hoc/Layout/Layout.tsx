import { ReactNode } from "react";
import { Box } from "@mui/material";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import { makeStyles } from '@mui/styles';

const useStyles  = makeStyles(() => ({
  mainAppContainer: {
    display: "flex",
    width: "99%",
    height: "100%",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",
    padding: "30px",
    boxSizing: "border-box"
  }
}))


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();
  return (
    <>
      <Toolbar />
      <Box component="main" className={classes.mainAppContainer}>
        {children}
      </Box>
      {/* <Box>
        <Box>Footer</Box>
      </Box> */}
    </>
  );
}

export default Layout;