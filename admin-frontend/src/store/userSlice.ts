import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import UserService from "../core/UserService/UserService";
import { RootState } from "./store";
import { showToast } from "./toastSlice";


export interface UserModel {
  id: number
  accountId: number;
  email: string;
  personDetails: {
    id: number,
    firstName: string;
    lastName: string;
    telephone: string;
    birthDate?: Date;
    accountId: number
  }
}

interface UserState {
  isLoading: boolean;
  error?: string,
  users?: UserModel[]
}

const initialState: UserState = {
  isLoading: false,
};

export const fetchUsers = createAsyncThunk<UserModel[], void, { rejectValue: string; state: RootState }>("package/fetchUsers", (_packageId: void, thunkAPI) => {
  return UserService.fetchUsers()
  .then((result: AxiosResponse) => {
    return result.data as UserModel[];
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load users details` }));
    return thunkAPI.rejectWithValue(`Fetching packages failed ... with status code, ${error.code as string}`);
  })
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      state.users = undefined;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.users = undefined;
    });
  }
});

export default userSlice.reducer;
