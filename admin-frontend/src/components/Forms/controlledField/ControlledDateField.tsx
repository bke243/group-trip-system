import { makeStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { blueButtonsColors } from "../../common/colors/colors";
import { DATE_FORMAT } from "../utils/fieldsUtilities";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import moment from "moment";

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
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const ControlledDateField = (props: ControlledFieldProps) => {
  const { name, label, disabled, onChange, value } = props;
  const classes = useStyles();

  const handDateFieldChange = (_newValue: any) => {
    if (_newValue?.toLocaleDateString()) {
      const date = moment(_newValue).format(DATE_FORMAT);
      onChange(date);
    } else {
      onChange(undefined);
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        className={classes.root}
        value={value}
        label={label}
        disabled={disabled}
        onChange={handDateFieldChange}
        minDate={new Date()}
        renderInput={(params) => (
          <TextField {...params} error={undefined} className={classes.root} size="small" variant="outlined" name={name} label={label} disabled={disabled} fullWidth />
        )}
      />
    </LocalizationProvider>
  );
};

export default ControlledDateField;
