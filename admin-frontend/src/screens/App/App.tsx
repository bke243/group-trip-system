import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../hoc/Layout/Layout';
import { Routes , Route } from "react-router-dom";
import './App.css';
import Home from '../Home/Home';
import AdminPanel from '../AdminPanel/AdminPanel';
import Login from '../Login/Login';

const useStyles  = makeStyles(() => ({
  appContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#ECEEF0",
  },
}))

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.appContainer}>
      <Layout>
        <Routes >
          <Route path="/" element={<Home />}  />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="signin" element={<Login />} />
        </Routes >
      </Layout>
    </Box>
  );
}

export default App;
