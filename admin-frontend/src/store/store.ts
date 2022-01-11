import { combineReducers, configureStore } from "@reduxjs/toolkit";
import systemSlice from "./systemSlice";
import dialogSlice from "./dialogSlice";
import toastSlice from "./toastSlice";
import packageSlice from "./packageSlice";
import dictionarySlice from "./dictionarySlice";
import { persistReducer } from "redux-persist";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: createIdbStorage({ name: "grouptrip", storeName: "grouptrip-webui" }),
  whitelist: ["system"],
};

const rootReducer = combineReducers({
    system: systemSlice,
    dialog: dialogSlice,
    toast: toastSlice,
    package: packageSlice,
    dictionary: dictionarySlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
