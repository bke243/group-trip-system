import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  pageNotFound: {
    minHeight: "100vh",
    paddingTop: "70px",
  },
});

const PageNotFound = () => {
  const classes = useStyles();
  return (
    <Box height="100vh" className={classes.pageNotFound}>
      <h1>Page not found</h1>
    </Box>
  );
};

export default PageNotFound;
