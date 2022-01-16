import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse, AxiosError } from "axios";
import AuthenticationService from "../core/AuthenticationService/AuthenticationService";
import LocalStorage, { TokenType } from "../core/LocalStorage/LocalStorage";
import { UserLoginModel } from "../models/UserAuthenticationModel";
import { showToast } from "./toastSlice";

interface UserCredentialSate {
  isAuthenticated: boolean;
  isLoadingUserDetail: boolean;
  personData?: { email: string, id: number };
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
      return result.data as { token: string; personData: { email: string, id: number }  };
    })
    .catch((error: AxiosError) => {
      thunkAPI.dispatch(showToast({ severity: "error", message: `Login failed ,please provide a good Email or Passowrd` }));
      return thunkAPI.rejectWithValue(`Login failed ... with status code, ${error.code as string}`);
    });
});

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    userLogout: (state) => {
      LocalStorage.removeAuthorizationToken();
      state.isAuthenticated = false;
      state.isLoadingUserDetail = false;
      state.personData = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // const decodedToken = action.payload;
      state.isAuthenticated = true;
      state.personData = action.payload.personData;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.isAuthenticated = false;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isAuthenticated = false;
    });
  }
});

export const { userLogout } = systemSlice.actions;

export default systemSlice.reducer;
