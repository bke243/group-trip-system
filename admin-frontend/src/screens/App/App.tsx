import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../hoc/Layout/Layout';
import './App.css';

const useStyles  = makeStyles(() => ({
  appContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    flexDirection: "column",
  },
}))

const App = () => {
  const classes = useStyles();
  return (
    <Box className={classes.appContainer}>
      <Layout>
        Panel admin
      </Layout>
    </Box>
  );
}

export default App;
