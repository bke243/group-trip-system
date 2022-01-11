import { makeStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { blueButtonsColors } from "../../common/colors/colors";
import { FormFieldProps } from "../utils/fieldsUtilities";

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

const FreeTextField = (props: FormFieldProps) => {
  const { setValue, getValues, control } = useFormContext();
  const { name, label, disabled, id, helperText, error, errorMessage, type } = props;
  const classes = useStyles();
  const formValue = useWatch({ name: name, control: control });
  const [fieldValue, setFieldValue] = useState<string | undefined | number >(getValues(name) ?? "");

  useEffect(() => {
    setFieldValue(formValue ?? "");
  }, [formValue]);

  const handTextFieldChange = (value: any) => {
    setValue(name, value?.target?.value ?? "");
    setFieldValue(value?.target?.value ?? "");
  };

  return (
    <TextField
      className={classes.root}
      size="small"
      value={fieldValue}
      error={error}
      variant="outlined"
      name={name}
      label={label}
      disabled={disabled}
      id={id}
      helperText={error ? errorMessage : helperText}
      fullWidth
      onChange={handTextFieldChange}
      type={type}
      autoComplete="off"
    />
  );
};

export const FreeNumberField = (props: FormFieldProps) => {
  const { setValue, getValues, control } = useFormContext();
  const { name, label, disabled, id, helperText, error, errorMessage, } = props;
  const classes = useStyles();
  const formValue = useWatch({ name: name, control: control });
  const [fieldValue, setFieldValue] = useState< undefined | number >(getValues(name) ? getValues(name) as number : 0);

  useEffect(() => {
    setFieldValue(formValue ? formValue as number : 0);
  }, [formValue]);

  const handTextFieldChange = (value: any) => {
    const editedValue = value?.target?.value ? parseInt(value?.target?.value) : 0;
    setValue(name, editedValue);
    setFieldValue(editedValue);
  };

  return (
    <TextField
      className={classes.root}
      size="small"
      value={fieldValue}
      error={error}
      variant="outlined"
      name={name}
      label={label}
      disabled={disabled}
      id={id}
      helperText={error ? errorMessage : helperText}
      fullWidth
      onChange={handTextFieldChange}
      type={"number"}
      autoComplete="off"
    />
  );
};


export default FreeTextField;
