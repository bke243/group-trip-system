import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PackageReadDto, setDeletePackageId } from "../../../store/packageSlice"
import { Box } from '@mui/material';
import { makeStyles } from "@mui/styles";
import travelManImage from "../../../assets/travelImage.jpg";
import { truncateText } from '../../../utils/customTypes';
import moment from 'moment';
import { DATE_FORMAT } from '../../Forms/utils/fieldsUtilities';
import { useNavigate } from "react-router-dom";
import { useDispatch } from '../../../store/react-redux-hooks';
import { DIALOG_TYPE, openDialog } from '../../../store/dialogSlice';

const useStyles = makeStyles({
  root: {
    transition: "transform 0.15s ease-in-out",
    // "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    width: "400px",
    // height: "600px",
    boxShadow: "5px 10px red"
  },
});

const Package = (props: PackageReadDto) => {
  const { name, description, price, count, startDate, endDate, id } = props;
  const classes = useStyles()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onViewViewDetailsClick = () => navigate(`/package/${id}`)
  const onPackageDeleteClickHandler = () => {
  dispatch(setDeletePackageId(id));
    dispatch(openDialog({ dialogType: DIALOG_TYPE.DELETE_PACKAGE, dialogTitle: "Delete Package" }))
  }

  return (
    <Card className={classes.root} sx={{ boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="40%"
        image={travelManImage}
        alt="card image"
      />
      <Box display="flex" height="60%" flexDirection="column" justifyContent="space-between">
        <CardContent>
          <Typography gutterBottom variant="h6" style={{ textTransform: "capitalize", fontWeight: "bold" }}  component="div">
            {name}
          </Typography>
          <Box display="flex" flexDirection="row" style={{ textTransform: "capitalize" }}>
              <Typography style={{ fontWeight: "bold" }}>{`Price : `} </Typography>
              <Typography>{` ${price} $/person`}</Typography>
          </Box>
          <Box display="flex" flexDirection="row" style={{ textTransform: "capitalize" }}>
              <Typography style={{ fontWeight: "bold" }}>{`Availabe number : `} </Typography>
              <Typography>{count}</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            {`Start date : ${moment(startDate).format(DATE_FORMAT)}   End date ${moment(endDate).format(DATE_FORMAT)}`}
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" style={{ textTransform: "capitalize" }}>
              <Typography style={{ fontWeight: "bold" }}>Description : </Typography>
              <Typography style={{ textAlign: "start", paddingLeft: "8px" }}>{truncateText(description, 260)}</Typography>
            </Box>
        </CardContent>
        <CardActions style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", paddingBottom: "10px" }}>
          <Button color="success"  size="small" variant="contained" onClick={onViewViewDetailsClick}>View details</Button>
          <Button color="error" size="small" variant="contained" onClick={onPackageDeleteClickHandler}>Delete</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default Package;