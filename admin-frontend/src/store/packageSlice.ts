import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse, AxiosError } from "axios";
import PackageService from "../core/PackageService/PackageService";
import { PackageCreateModel } from "../models/PackageModel";
import { closeDialog } from "./dialogSlice";
import { RootState } from "./store";
import { showToast } from "./toastSlice";

export interface PackageReadDto { 
  id: number;
  name: string;
  activities: string[],
  description: string,
  price: number,
  created: Date,
  startDate: Date,
  endDate: Date,
  count: number,
  maxPersons: number,
  adminId: number,
  locationId: number
}

interface PackageSate {
 isLoading: boolean;
 packages?: { [id: string]: PackageReadDto };
 package?: PackageReadDto;
 errorMessage?: string;
}

const initialState: PackageSate = {
  isLoading: false,
};


export const createPackage = createAsyncThunk<PackageReadDto[], PackageCreateModel, { rejectValue: string; state: RootState }>("package/createPackage", (packageDetails: PackageCreateModel, thunkAPI) => {
  thunkAPI.dispatch(showToast({ severity: "info", message: "Creating package ..." }));
    return PackageService.createPackage(packageDetails)
    .then(async (result: AxiosResponse) => {
      thunkAPI.dispatch(showToast({ severity: "success", message: "PackageCreated with success" }));
      thunkAPI.dispatch(closeDialog());
      thunkAPI.dispatch(fetchPackages())
      return result.data;
    })
    .catch((error: AxiosError) => {
      // const errorMessage = getResponseErrorMessage(error);
      thunkAPI.dispatch(showToast({ severity: "error", message: `Package creation failed` }));
      return thunkAPI.rejectWithValue(`Package creation failed ... with status code, ${error.code as string}`);
    });
});

export const fetchPackages = createAsyncThunk<PackageReadDto[], void, { rejectValue: string; state: RootState }>("package/getPackages", (_packageId: void, thunkAPI) => {
  return PackageService.getPackages()
  .then((result: AxiosResponse) => {
    return result.data as PackageReadDto[];
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load packages` }));
    return thunkAPI.rejectWithValue(`Fetching packages failed ... with status code, ${error.code as string}`);
  })
})

export const fetcPackageById = createAsyncThunk("package/getPackageById", (packageId: number, thunkAPI) => {
  return PackageService.getPackageById(packageId)
  .then((result: AxiosResponse) => {
    return result.data as PackageReadDto;
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load package` }));
    return thunkAPI.rejectWithValue(`Fetching [ackages] failed ... with status code, ${error.code as string}`);

  })
})


export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPackages.fulfilled, (state, action) => {
      state.isLoading = false;
      const packages = action.payload.reduce((indexedPackages, nextPackage) => {
        const newPackages = { ...indexedPackages };
        newPackages[nextPackage.id] = nextPackage;
        return newPackages;
      }, {} as { [id: number]: PackageReadDto });
      state.packages = packages;
    });
    builder.addCase(fetchPackages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPackages.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    });
  }
});

export default packageSlice.reducer;
