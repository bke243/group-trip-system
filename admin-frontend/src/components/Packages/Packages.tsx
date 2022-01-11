import { Box, Grid } from '@mui/material';
import { useSelector } from '../../store/react-redux-hooks';
import Package from './integrant/Package';

const Packages = () => {
  const { packages } = useSelector((state) => state.package);
  const availablePackages = Object.values(packages ?? {});
  return (
    <Box sx={{ flexGrow: 1, overflowX: "hidden", maxHeight: "100vh", padding: "15px" }}>
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