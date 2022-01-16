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
  },
  isActive: boolean,
}

export enum USER_STATUS {
  ACTIVE="ACTIVE",
  BLOCKED="BLOCKED"
};

interface UserState {
  isLoading: boolean;
  error?: string,
  users?: UserModel[]
}

const initialState: UserState = {
  isLoading: false,
};

export const fetchUsers = createAsyncThunk<UserModel[], void, { rejectValue: string; state: RootState }>("user/fetchUsers", (_packageId: void, thunkAPI) => {
  return UserService.fetchUsers()
  .then((result: AxiosResponse) => {
    return result.data as UserModel[];
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load users details` }));
    return thunkAPI.rejectWithValue(`Fetching users failed ... with status code, ${error.code as string}`);
  })
})

export const manageUserStatus = createAsyncThunk<number, { userAccountId: number, newStatus: USER_STATUS }, { rejectValue: string; state: RootState }>("user/manageUserStatus", (userDetails, thunkAPI) => {
  const userStatusManager = userDetails.newStatus === USER_STATUS.ACTIVE ? UserService.ActivatekUserByAccountId : UserService.blockUserByAccountId;
  return userStatusManager(userDetails.userAccountId).then((result) => {
    return userDetails.userAccountId;
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load users details` }));
    return thunkAPI.rejectWithValue(`Managing user failed ... with status code, ${error.code as string}`);
  })
});

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
    builder.addCase(manageUserStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const userAccountId = action.payload;
      const userIndex = (state.users ?? []).findIndex((user) => user.accountId === userAccountId);
      if (userIndex >=0) {
        state.users![userIndex].isActive = !state.users![userIndex].isActive;
      }
    });
  }
});

export default userSlice.reducer;
