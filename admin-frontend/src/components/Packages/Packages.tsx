import { Box, Grid } from '@mui/material';
import { useSelector } from '../../store/react-redux-hooks';
import Package from './integrant/Package';
import { makeStyles } from "@mui/styles";
import { blueButtonsColors } from '../common/colors/colors';

const useStyles = makeStyles({
  packagesContainer: {
    '&::-webkit-scrollbar': {
      width: '0.9em'
    },
    '&::-webkit-scrollbar-track': {
    borderRadius: "10px",
    backgroundColor: "#F5F5F5",
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: "10px",
      backgroundColor: "#555",
      outline: `1px solid ${blueButtonsColors}`
    }
  },
});

const Packages = () => {
  const { packages } = useSelector((state) => state.package);
  const classes = useStyles();
  const availablePackages = Object.values(packages ?? {});
  return (
    <Box sx={{ flexGrow: 1, overflowX: "hidden", maxHeight: "100vh", padding: "15px" }} className={classes.packagesContainer}>
      <Grid container spacing={4} sx={{ flexGrow: 1 }} direction="row" >
        {availablePackages.map((availablePackage) => {
          return ( 
            <Grid item  key={`package-${availablePackage.id}`} xs={4} style={{ display:"flex", alignItems: "center", justifyContent: "center" }} >
              <Package key={`package-${availablePackage.id}`} {...availablePackage} />
            </Grid>
)
        })}
      </Grid>
    </Box>
  );
}

export default Packages;