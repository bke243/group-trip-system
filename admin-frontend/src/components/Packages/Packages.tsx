import { Box, Grid } from '@mui/material';
import { useSelector } from '../../store/react-redux-hooks';
import Package from './integrant/Package';
import { makeStyles } from "@mui/styles";
import { blueButtonsColors } from '../common/colors/colors';
import travelManImage from "../../assets/travelImage.jpg";
import travelManImage2 from "../../assets/travelImage2.jpg";
import travelManImage3 from "../../assets/travelImage3.jpg";
import travelManImage4 from "../../assets/travelImage4.jpg";
import travelManImage5 from "../../assets/travelImage5.jpg";
import travelManImage6 from "../../assets/travelImage6.jpg";
import travelManImage7 from "../../assets/travelImage7.jpg";
import travelManImage8 from "../../assets/travelImage8.jpg";

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

const imagesList = [travelManImage, travelManImage2, travelManImage3, travelManImage4, travelManImage5, travelManImage6, travelManImage7, travelManImage8]

const Packages = () => {
  const { packages } = useSelector((state) => state.package);
  const classes = useStyles();
  const availablePackages = Object.values(packages ?? {});
  return (
    <Box sx={{ flexGrow: 1, overflowX: "hidden", maxHeight: "100vh", padding: "15px" }} className={classes.packagesContainer}>
      <Grid container spacing={4} sx={{ flexGrow: 1 }} direction="row" >
        {availablePackages.map((availablePackage, index) => {
          return ( 
            <Grid item  key={`package-${availablePackage.id}`} xs={12} md={6} lg={4} xl={3} style={{ display:"flex", alignItems: "flex-start", justifyContent: "center" }} >
              <Package key={`package-${availablePackage.id}`} {...availablePackage} imageName={imagesList[index % imagesList.length]} />
            </Grid>
)
        })}
      </Grid>
    </Box>
  );
}

export default Packages;