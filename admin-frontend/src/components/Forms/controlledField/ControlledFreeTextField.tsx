import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { blueButtonsColors } from "../../common/colors/colors";

const useStyles = makeStyles({
  root: {
    "& .MuiInput-underline:after": {
      borderBottomColor: "#FFE4D1",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: blueButtonsColors,
      },
      "&:hover fieldset": {
        borderColor: blueButtonsColors,
      },
      "&.Mui-focused fieldset": {
        borderColor: blueButtonsColors,
      },
    },
    height: "40px",
  },
});

interface ControlledFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: any) => void;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
  error?: boolean
  errorText: string
}

const ControlledFreeTextField = (props: ControlledFieldProps) => {
  const { name, label, disabled, onChange, type, value, error, errorText } = props;
  
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      size="small"
      value={value}
      variant="outlined"
      name={name}
      label={label}
      error={error}
      disabled={disabled}
      fullWidth
      onChange={onChange}
      type={type}
      helperText={ error ? errorText : undefined }
      autoComplete="off"
    />
  );
};

export default ControlledFreeTextField;
