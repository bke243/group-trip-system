import { Box } from "@mui/system";
import { useFormContext } from "react-hook-form";
import { FormFieldProps, getFieldErrorByName } from "../utils/fieldsUtilities";

const FormFieldContainer = (props: FormFieldProps) => {
  const { Component, name } = props;
  const {
    formState: { errors },
  } = useFormContext();
  const error = getFieldErrorByName(errors, name);
  const updateProps = { ...props, error: Boolean(error), errorMessage: error };
  return (
    <Box mb={3}>
      <Component {...updateProps} />
    </Box>
  );
};

export default FormFieldContainer;
