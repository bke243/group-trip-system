import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_NAME } from "../../../Forms/utils/fieldsUtilities";
import FormBuilder from "../../../Forms/utils/formBuilder";
import DialogActionsButton from "../DialogActionsButton/DialogActionsButton";
import { createPackageFields, packageDetailsFields, descprtionFields, packageActivitiesFields } from "./utils/CreatePackage.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { PackageCreateModel, PackageCreateSchema } from "../../../../models/PackageModel";
import { createPackage } from "../../../../store/packageSlice";
import { useDispatch } from "../../../../store/react-redux-hooks";

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
  const [fields, setFields] = useState<{ component: JSX.Element; fieldName: string; label: string }[]>([]);
  const formMethods = useForm<PackageCreateModel>({
    resolver: zodResolver(PackageCreateSchema),
    defaultValues: {
      activities: [],
      country: "United States"
    }
  });
  const dispatch = useDispatch();
  
  const onSubmit = (values: any) => {
    dispatch(createPackage(values));
  };


  useEffect(() => {
    const formBuilder = new FormBuilder(createPackageFields, FORM_NAME.CREATE_PACKAGE);
    formBuilder.disableFormFields(["country"])
    const newFields = formBuilder.buildeFormFieldsWithName();
    setFields(newFields);
  }, []);

  // useEffect(() => {
  //   console.log(formMethods.formState.errors);
  // }, [formMethods.formState.errors]);

  return (
    <Box className={classes.addpersonToTreeContainer}>
      <Box className={classes.addPersonFormContainer}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} noValidate className={classes.addPersonForm}>
          <FormProvider {...formMethods}>
          <Box paddingTop="20px" width={"100%"}>
            <Grid container spacing={2}>
            {fields
                  .filter((field) => packageDetailsFields.includes(field.fieldName))
                  .map((field, index) => {
                  return (
                    <Grid item xs={12} md={6} key={`create-package-field-${index}`}>
                        {field.component}
                    </Grid>
                    );
                  })}
                  {fields
                  .filter((field) => packageActivitiesFields.includes(field.fieldName))
                  .map((field, index) => {
                  return (
                    <Grid item xs={12} md={12} key={`create-package-field-${index}`}>
                        {field.component}
                    </Grid>
                    );
                  })}
              {fields
                  .filter((field) => descprtionFields.includes(field.fieldName))
                  .map((field, index) => {
                  return (
                    <Grid item xs={12} md={12} key={`create-package-field-${index}`}>
                        {field.component}
                    </Grid>
                    );
                  })}
            </Grid>
          </Box>
          </FormProvider>
          <DialogActionsButton submiText={"Create  Package"} />
        </form>
      </Box>
    </Box>
  );
};

export default DialogCreatePackage;
