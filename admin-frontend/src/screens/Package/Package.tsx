import { makeStyles } from "@material-ui/styles";
import { Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PackageViewDetails from "../../components/PackageViewDetails/PackageViewDetails";
import { fetchPackageById } from "../../store/packageSlice";
import { useDispatch, useSelector } from "../../store/react-redux-hooks";

const useStyles = makeStyles({
  packageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
});

const Package = () => {
  const urlParameters = useParams();
  const dispatch = useDispatch()
  const classes = useStyles();
  const { packageViewDetails } = useSelector((state) => state.package);


  useEffect(() => {
    const { packageId } = urlParameters ;
    dispatch(fetchPackageById(packageId as any));
  }, [urlParameters]);

  if (!packageViewDetails) return <Box>Loading or error message</Box>

  return (
    <Box className={classes.packageContainer}>
      <Typography variant="h4" justifySelf="flex-start" alignSelf={"flext-start"}  sx={{ width: "100%" }}>Package Details</Typography>
      <PackageViewDetails />
    </Box>);
};

export default Package;
