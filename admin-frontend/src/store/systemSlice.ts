import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse, AxiosError } from "axios";
import AuthenticationService from "../core/AuthenticationService/AuthenticationService";
import LocalStorage, { TokenType } from "../core/LocalStorage/LocalStorage";
import { UserLoginModel } from "../models/UserAuthenticationModel";
import { showToast } from "./toastSlice";

interface UserCredentialSate {
  isAuthenticated: boolean;
  isLoadingUserDetail: boolean;
}

const initialState: UserCredentialSate = {
  isAuthenticated: false,
  isLoadingUserDetail: false,
};


export const userLogin = createAsyncThunk("system/userLogin", (userData: UserLoginModel, thunkAPI) => {
  thunkAPI.dispatch(showToast({ severity: "info", message: "Login ..." }));
  return AuthenticationService.login(userData)
    .then((result: AxiosResponse<any>) => {
      thunkAPI.dispatch(showToast({ severity: "success", message: "Login done with success" }));
      const authToken = result.data as TokenType;
      LocalStorage.setAuthorizationToken(authToken);
      return authToken;
    })
    .catch((error: AxiosError) => {
      // const errorMessage = getResponseErrorMessage(error);
      thunkAPI.dispatch(showToast({ severity: "error", message: `Login failed ,please provide a good Email or Passowrd` }));
      return thunkAPI.rejectWithValue(`Login failed ... with status code, ${error.code as string}`);
    });
});

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // const decodedToken = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.isAuthenticated = false;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isAuthenticated = false;
    });
  }
});

export default systemSlice.reducer;
