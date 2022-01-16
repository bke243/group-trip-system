import { zodResolver } from "@hookform/resolvers/zod";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system"
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_NAME } from "../../components/Forms/utils/fieldsUtilities";
import FormBuilder from "../../components/Forms/utils/formBuilder";
import { PackageDetailReadModel, PackageDetailReadSchema } from "../../models/PackageModel";
import { openDialog, DIALOG_TYPE } from "../../store/dialogSlice";
import { setDeletePackageId, updatePackage } from "../../store/packageSlice";
import { useDispatch, useSelector } from "../../store/react-redux-hooks";
import { packageActivitiesFields } from "../dialogs/integrant/CreatePackage/utils/CreatePackage.util";
import { editPackageFields, descprtionFields, packageAccomodationFields, packageDetailsFields } from "./util/PackageViewDetails.util";

const useStyles = makeStyles({
  packageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: "100%",
  },
});

const PackageViewDetails = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const { packageViewDetails } = useSelector((state) => state.package);
  const [fields, setFields] = useState<{ component: JSX.Element; fieldName: string; label: string }[]>([]);
  const formMethods = useForm<PackageDetailReadModel>({
    resolver: zodResolver(PackageDetailReadSchema),
    defaultValues: packageViewDetails as any,
  });

 

  useEffect(() => {
    const formBuilder = new FormBuilder(editPackageFields, FORM_NAME.PACKAGE_EDIT);
    formBuilder.disableFormFields(["id", ...packageAccomodationFields])
    const newFields = formBuilder.buildeFormFieldsWithName();
    setFields(newFields);
  }, []);

  // useEffect(() => {
  //   console.log(formMethods.formState.errors);
  // }, [formMethods.formState.errors]);

  const onSubmit = (values: PackageDetailReadModel) => {
    dispatch(updatePackage(values));
  };

  const onPackageDeleteClickHandler = () => {
    dispatch(setDeletePackageId(packageViewDetails!.id));
    dispatch(openDialog({ dialogType: DIALOG_TYPE.DELETE_PACKAGE, dialogTitle: "Create Package" }))
  }

  return (
      <Box className={classes.packageContainer}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)} noValidate >
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
                  <Box width={"100%"}>
                    <Typography variant="h5">Accomodation</Typography>
                  </Box>
                  {fields
                  .filter((field) => packageAccomodationFields.includes(field.fieldName))
                  .map((field, index) => {
                  return (
                    <Grid item xs={12} md={6} key={`create-package-field-${index}`}>
                        {field.component}
                    </Grid>
                    );
                  })}
                  <Box width={"100%"}>
                    <Typography variant="h5">Activities</Typography>
                  </Box>
                  {fields
                  .filter((field) => packageActivitiesFields.includes(field.fieldName))
                  .map((field, index) => {
                  return (
                    <Grid item xs={12} md={12} key={`create-package-field-${index}`}>
                        {field.component}
                    </Grid>
                    );
                  })}
                  <Box width={"100%"}>
                    <Typography variant="h5">Details</Typography>
                  </Box>
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
            <Box style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <Stack spacing={2} direction="row" >
                <Button   variant="contained" color="primary" style={{ color: "white" }} type="submit">
                  Update details
                </Button>
                <Button onClick={(onPackageDeleteClickHandler)}  variant="contained" color="error">
                  Delete
                </Button>
              </Stack>
            </Box>
            </form>
    </Box>
  );
};

export default PackageViewDetails;


