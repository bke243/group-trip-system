import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_NAME } from "../../../Forms/utils/fieldsUtilities";
import FormBuilder from "../../../Forms/utils/formBuilder";
import DialogActionsButton from "../DialogActionsButton/DialogActionsButton";
import { createPackageFields } from "./utils/CreatePackage.util";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useDispatch } from "../../../../store/react-redux-hooks";

const useStyles = makeStyles({
  addpersonToTreeContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  addPersonFormContainer: {
    paddingTop: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10px",
  },
  addPersonForm: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",

  },
});

const DialogCreatePackage = () => {
  const classes = useStyles();
  const [fields, setFields] = useState<JSX.Element[]>([]);
  const formMethods = useForm<any>({
    resolver: undefined,
  });
  // const dispatch = useDispatch();
  
  const onSubmit = (values: any) => {
    console.log(values);
  };

  useEffect(() => {
    const formBuilder = new FormBuilder(createPackageFields, FORM_NAME.CREATE_PACKAGE);
    const newFields = formBuilder.buildFormFields();
    setFields(newFields);
  }, []);

  return (
    <Box className={classes.addpersonToTreeContainer}>
      <Box className={classes.addPersonFormContainer}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} noValidate className={classes.addPersonForm}>
          <FormProvider {...formMethods}>
          <Box paddingTop="20px" width={"100%"}>
            <Grid container spacing={2}>
              {fields.map((field, index) => {
                return (
                  <Grid item xs={12} md={6} key={`create-package-field-${index}`}>
                    {field}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          </FormProvider>
          <DialogActionsButton submiText={"Add Person"} />
        </form>
      </Box>
    </Box>
  );
};

export default DialogCreatePackage;
