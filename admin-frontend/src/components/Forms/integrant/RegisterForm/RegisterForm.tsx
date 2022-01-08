import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Box } from "@mui/system";

const useStyles = makeStyles({
  registerFormContainer: {
    width: "100%",
  },
});

const RegisterForm = ({ fields }: { fields: JSX.Element[] }) => {
  const classes = useStyles();
  return (
    <Box className={classes.registerFormContainer}>
      <Grid container spacing={3}>
        {fields.map((field, index) => {
          return (
            <Grid item xs={12} md={6} key={`register-field-number-${index}`}>
              {field}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default RegisterForm;
