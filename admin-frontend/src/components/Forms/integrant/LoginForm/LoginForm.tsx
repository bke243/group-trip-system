import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Box } from "@mui/system";

const useStyles = makeStyles({
  loginFormContainer: {
    width: "100%",
  },
});

const LoginForm = ({ fields }: { fields: JSX.Element[] }) => {
  const classes = useStyles();
  return (
    <Box className={classes.loginFormContainer}>
      <Grid container spacing={3}>
        {fields.map((field, index) => {
          return (
            <Grid item xs={12} key={`register-field-number-${index}`}>
              {field}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default LoginForm;
