import { makeStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { useFormContext, useWatch } from "react-hook-form";
import { blueButtonsColors } from "../../common/colors/colors";
import { DATE_FORMAT, FormFieldProps } from "../utils/fieldsUtilities";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import moment from "moment";

import { useEffect, useState } from "react";

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

const DateField = (props: FormFieldProps) => {
  const { setValue, getValues, control } = useFormContext();
  const { name, label, disabled, id, helperText, error, errorMessage } = props;
  const classes = useStyles();
  const [dateValue, setDateValue] = useState<string | undefined | null>(getValues(name) ?? "");
  const formValue = useWatch({ name: name, control: control });
  const handDateFieldChange = (_newValue: any) => {
    if (_newValue?.toLocaleDateString()) {
      const date = moment(_newValue).format(DATE_FORMAT);
      setValue(name, date);
      setDateValue(date);
    } else {
      setValue(name, undefined);
      setDateValue(undefined);
    }
  };

  useEffect(() => {
    setDateValue(formValue ?? "");
  }, [formValue]);

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DesktopDatePicker
        inputFormat="MM/dd/yyyy"
        className={classes.root}
        value={dateValue}
        label={label}
        disabled={disabled}
        onChange={handDateFieldChange}
        minDate={new Date()}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.root}
            size="small"
            error={error}
            variant="outlined"
            name={name}
            label={label}
            disabled={disabled}
            id={id}
            helperText={error ? errorMessage : helperText}
            fullWidth
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateField;
