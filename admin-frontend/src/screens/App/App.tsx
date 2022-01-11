import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../hoc/Layout/Layout';
import { Routes , Route, Navigate  } from "react-router-dom";
import './App.css';
import FlasMessage from "../../components/FlashMessage/FlasMessage";
import AdminPanel from '../AdminPanel/AdminPanel';
import Login from '../Login/Login';
import DialogView from "../../components/dialogs/DialogView";
import PageNotFound from '../PageNotFound/PageNotFound';
import { useSelector } from '../../store/react-redux-hooks';
import Package from '../Package/Package';

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
  const { isAuthenticated } = useSelector((state) => state.system);
  return (
    <Box className={classes.appContainer}>
      <Layout>
        <DialogView />
        <Routes >
          {isAuthenticated ?
           [
            <Route path="/admin" element={<AdminPanel />} key={"admin"} />,
            <Route path="/package" key={"package"}>
              <Route path=":id"  element={<Package />} />
            </Route>
           ] : 
           <Route path="/admin" element={<Navigate replace to="/" />} />
          }
            <Route path="/" element={<Login />} key={"login"} />
            {/* <Route path="/" element={<Home />}  /> */}
            <Route  element={<PageNotFound />} />
        </Routes >
      </Layout>
      <FlasMessage />
    </Box>
  );
}

export default App;
