import { combineReducers, configureStore } from "@reduxjs/toolkit";
import systemSlice from "./systemSlice";
import dialogSlice from "./dialogSlice";
import { persistReducer } from "redux-persist";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: createIdbStorage({ name: "grouptrip", storeName: "grouptrip-webui" }),
  whitelist: ["systemSlice"],
};

const rootReducer = combineReducers({
    system: systemSlice,
    dialog: dialogSlice,
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
