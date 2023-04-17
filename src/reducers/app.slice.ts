import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ErrorLog = {
  date: string;
  user: string;
  origin: string;
  errorName: string;
  errorStack: string;
  errorMessage: string;
  errorCause: string;
};
export type AppStateStructure = {
  errorLog: ErrorLog[];
  urlPage: string;
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
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addErrorLog(state: AppStateStructure, action: PayloadAction<ErrorLog>) {
      state.errorLog.push(action.payload);
    },
    updateUrlPage(state: AppStateStructure, action: PayloadAction<string>) {
      state.urlPage = action.payload;
    },
  },
});

export const { addErrorLog, updateUrlPage } = appSlice.actions;

export const appReducer = appSlice.reducer;
