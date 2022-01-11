import DictionaryService from "../core/DictionaryService/DictionaryService";
import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { AxiosResponse, AxiosError } from "axios";
import { showToast } from "./toastSlice";


interface LocationReadDto { 
  id: number;
  streetName: string;
  zipCode?: string;
  state?: string;
  cityId: number;
  countryId?: number;
  country: CountryState,
  city: CityState,
}

interface CountryState { 
  id: number;
  name: string;
}

interface CityState { 
  id: number;
  name: string;
  countryId: number;
}


interface DictionaryState {
 locations: { isLoading: boolean, locations?: { [id: number]: LocationReadDto }, errorMessage?: string };
}

const initialState: DictionaryState = {
  locations: { isLoading: false },
};

export const getLocations = createAsyncThunk<LocationReadDto[], void, { rejectValue: string; state: RootState }>("dictionary/getLocations", (_packageId: void, thunkAPI) => {
  return DictionaryService.getLocations()
  .then((result: AxiosResponse) => {
    return result.data as LocationReadDto[];
  }).catch((error: AxiosError) => {
    thunkAPI.dispatch(showToast({ severity: "error", message: `Could not load locations` }));
    return thunkAPI.rejectWithValue(`Fetching locations failed ... with status code, ${error.code as string}`);
  })
})


export const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.locations.isLoading = false;
      const locations = action.payload.reduce((indexedLocations, nextPackage) => {
        const newPackages = { ...indexedLocations };
        newPackages[nextPackage.id] = nextPackage;
        return newPackages;
      }, {} as { [id: number]: LocationReadDto });
      state.locations.locations = locations;
    });
    builder.addCase(getLocations.pending, (state, action) => {
      state.locations.isLoading = true;
    });
    builder.addCase(getLocations.rejected, (state, action) => {
      state.locations.isLoading = false;
      state.locations.errorMessage = action.payload;
    });
  }
});

export default dictionarySlice.reducer;
