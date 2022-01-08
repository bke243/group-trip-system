import { makeStyles } from "@mui/styles";
import { Box, Theme } from "@mui/system";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomButton from "../../components/common/Button/Button";
import LoginForm from "../../components/Forms/integrant/LoginForm/LoginForm";
import { FORM_NAME } from "../../components/Forms/utils/fieldsUtilities";
import FormBuilder from "../../components/Forms/utils/formBuilder";
import { UserLoginModel, UserLoginSchema } from "../../models/UserAuthenticationModel";
import { userLoginFeildsName } from "./utils/Login.util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../store/react-redux-hooks";
import { userLogin } from "../../store/systemSlice";

const useStyles = makeStyles((theme: Theme) => ({
  loginContainer: {
    minHeight: "75vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingTop: "70px",
  },
  loginFormContainer: {
    width: "300px",
    paddingTop: "30px",
  },
  registerTypography: {
    textAlign: "left",
    paddingBottom: "15px",
    "& span": {
      textDecoration: "underline",
      color: "blue",
      cursor: "pointer",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const formMethods = useForm<UserLoginModel>({
    resolver: zodResolver(UserLoginSchema),
  });
  const [fields, setFields] = useState<JSX.Element[]>([]);
  const isAuthenticated = useSelector((state) => state.system.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    const formBuilder = new FormBuilder(userLoginFeildsName, FORM_NAME.LOGIN);
    const newFields = formBuilder.buildFormFields();
    setFields(newFields);
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [navigate, isAuthenticated]);

  const dispatch = useDispatch();
  const onSubmit = (values: UserLoginModel) => {
    dispatch(userLogin(values));
  };

  return (
    <Box className={classes.loginContainer}>
      <Box>
        <h1 style={{ margin: "0px", padding: "0px", textAlign: "start" }}>Login</h1>
      </Box>
      <FormProvider {...formMethods}>
        <form className={classes.loginFormContainer} onSubmit={formMethods.handleSubmit(onSubmit)}>
          <LoginForm fields={fields} />
          <Box width="100%" display="flex" justifyContent="flex-end">
            <CustomButton buttonText="Login >" type="submit" />
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Login;
