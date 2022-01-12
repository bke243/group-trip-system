import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { blueButtonsColors } from "../../common/colors/colors";
import { FormFieldProps } from "../utils/fieldsUtilities";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const useStyles = makeStyles({
  root: {
    borderSize: "20px",
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

const TextAreaField = (props: FormFieldProps) => {
  const { setValue, getValues, control } = useFormContext();
  const { name, label, disabled, id, error } = props;
  const classes = useStyles();
  const formValue = useWatch({ name: name, control: control });
  const [fieldValue, setFieldValue] = useState<string | undefined>(getValues(name) ?? "");

  useEffect(() => {
    setFieldValue(formValue ?? "");
  }, [formValue]);

  const handTextFieldChange = (value: any) => {
    setValue(name, value?.target?.value ?? "");
    setFieldValue(value?.target?.value ?? "");
  };

  return (
    <TextareaAutosize
      className={classes.root}
      name={name}
      placeholder={label}
      disabled={disabled}
      value={fieldValue}
      id={id}
      onChange={handTextFieldChange}
      autoComplete="off"
      minRows={13}
      draggable={false}
      style={{ width: "100%", resize: "none", border: `1px solid ${error ? "red" : blueButtonsColors}`, borderRadius: "5px" }}
    />
  );
};

export default TextAreaField;
