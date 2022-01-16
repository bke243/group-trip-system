import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse, AxiosError } from "axios";
import PackageService from "../core/PackageService/PackageService";
import { PackageCreateModel, PackageDetailReadModel } from "../models/PackageModel";
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

export interface PackageReadDetailsDto extends PackageReadDto {
  country: string,
  city: string,
  streetName: string;
  zipCode?: string;
  state?: string;
}

interface PackageSate {
 isLoading: boolean;
 packages?: { [id: string]: PackageReadDto };
 packageViewDetails?: PackageReadDetailsDto;
 errorMessage?: string;
 deletePackageId?: number;
}

const initialState: PackageSate = {
  isLoading: false,
};


export const createPackage = createAsyncThunk<PackageReadDto[], PackageCreateModel, { rejectValue: string; state: RootState }>("package/createPackage", (packageDetails: PackageCreateModel, thunkAPI) => {
  thunkAPI.dispatch(showToast({ severity: "info", message: "Creating package ..." }));
    return PackageService.createPackage(packageDetails)
    .then(async (result: AxiosResponse) => {
      thunkAPI.dispatch(showToast({ severity: "success", message: "Package Created with success" }));
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

export const fetchPackages = createAsyncThunk<PackageReadDto[], void, { rejectValue: string; state: RootState }>("package/fetchPackages", (_packageId: void, thunkAPI) => {
  return PackageService.fetchPackages()
  .then((result: AxiosResponse) => {
    return result.data as PackageReadDto[];
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load packages` }));
    return thunkAPI.rejectWithValue(`Fetching packages failed ... with status code, ${error.code as string}`);
  })
})

export const fetchPackageById = createAsyncThunk("package/fetchPackageById", (packageId: number, thunkAPI) => {
  return PackageService.fetchPackageById(packageId)
  .then((result: AxiosResponse) => {
    return result.data as PackageReadDetailsDto;
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load package` }));
    return thunkAPI.rejectWithValue(`Fetching [ackages] failed ... with status code, ${error.code as string}`);

  })
})

export const updatePackage = createAsyncThunk<PackageReadDto[], PackageDetailReadModel, { rejectValue: string; state: RootState }>("package/updatePackage", (packageDetails, thunkAPI) => {
  thunkAPI.dispatch(showToast({ severity: "info", message: "Updating package ..." }));
    return PackageService.updatePackage(packageDetails)
    .then(async (result: AxiosResponse) => {
      thunkAPI.dispatch(showToast({ severity: "success", message: "Package updated with success" }));
      thunkAPI.dispatch(closeDialog());
      thunkAPI.dispatch(fetchPackageById(packageDetails.id));
      return result.data;
    })
    .catch((error: AxiosError) => {
      thunkAPI.dispatch(showToast({ severity: "error", message: `Package update failed` }));
      return thunkAPI.rejectWithValue(`Package creation failed ... with status code, ${error.code as string}`);
    });
});

export const deletePackage = createAsyncThunk<PackageReadDto[], { packageId: number, packageNavigateCallBack?: () => void }, { rejectValue: string; state: RootState }>("package/deletePackage", (deletePackageDetails, thunkAPI) => {
  thunkAPI.dispatch(showToast({ severity: "info", message: "Deleting package ..." }));
    return PackageService.deletePackage(deletePackageDetails.packageId)
    .then(async (result: AxiosResponse) => {
      thunkAPI.dispatch(showToast({ severity: "success", message: "Package deleted with success" }));
      thunkAPI.dispatch(closeDialog());
      if (deletePackageDetails.packageNavigateCallBack) deletePackageDetails.packageNavigateCallBack();
      thunkAPI.dispatch(fetchPackages());
      return result.data;
    })
    .catch((error: AxiosError) => {
      thunkAPI.dispatch(showToast({ severity: "error", message: `Package delete failed` }));
      return thunkAPI.rejectWithValue(`Package deletion failed ... with status code, ${error.code as string}`);
    });
});


export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setDeletePackageId: (state, action: PayloadAction<number>) => {
      state.deletePackageId = action.payload;
    },
  },
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
      state.packages = undefined;
    });
    builder.addCase(fetchPackages.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.packages = undefined;
    });
    builder.addCase(fetchPackageById.fulfilled, (state, action) => {
      state.packageViewDetails = action.payload;
    });
    builder.addCase(fetchPackageById.pending, (state, action) => {
      state.packageViewDetails = undefined;
    });
  }
});


export const { setDeletePackageId } =  packageSlice.actions;
export default packageSlice.reducer;
