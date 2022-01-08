import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { closeToast } from "../../store/toastSlice";
import { useDispatch, useSelector } from "../../store/react-redux-hooks";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      // marginTop: theme.spacing(2),
    },
    height: "100px",
  },
  alertContainer: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const { opened, message, severity } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const handleClose = (_event?: React.SyntheticEvent, _reason?: string) => {
    dispatch(closeToast());
  };

  if (!opened) return null;

  return (
    <div className={classes.root}>
      <Snackbar open={opened} autoHideDuration={6000} onClose={() => handleClose()}  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity={severity} className={classes.alertContainer}>
          <pre>{message}</pre>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
