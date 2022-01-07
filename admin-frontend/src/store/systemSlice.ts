import { createSlice } from "@reduxjs/toolkit";

interface UserCredentialSate {
  isAuthenticated: boolean;
  isLoadingUserDetail: boolean;
  hasUserDetailLoadingError?: string;
}

const initialState: UserCredentialSate = {
  isAuthenticated: false,
  isLoadingUserDetail: false,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
});

export default systemSlice.reducer;
