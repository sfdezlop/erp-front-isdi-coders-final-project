import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ErrorLogStructure = {
  date: string;
  user: string;
  origin: string;
  errorName: string;
  errorStack: string;
  errorMessage: string;
  errorCause: string;
};
export type AppStateStructure = {
  errorLog: ErrorLogStructure[];
  urlPage: string;
  storeLog: { date: string; user: string; log: {} };
};

export const initialState: AppStateStructure = {
  errorLog: [
    {
      date: new Date().toString(),
      user: "Initial",
      origin: "Initial",
      errorName: "Initial",
      errorStack: "Initial",
      errorMessage: "Initial",
      errorCause: "Initial",
    },
  ],
  urlPage: "",

  storeLog: {
    date: new Date().toString(),
    user: "Initial",
    log: {},
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addErrorLog(
      state: AppStateStructure,
      action: PayloadAction<ErrorLogStructure>
    ) {
      state.errorLog.push(action.payload);
    },
    updateUrlPage(state: AppStateStructure, action: PayloadAction<string>) {
      state.urlPage = action.payload;
    },
    updateStore(
      state: AppStateStructure,
      action: PayloadAction<{ date: string; user: string; log: {} }>
    ) {
      state.storeLog = action.payload;
    },
  },
});

export const { addErrorLog, updateUrlPage, updateStore } = appSlice.actions;

export const appReducer = appSlice.reducer;
