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
  queryInput: {
    filterCollection: string;
    filterField: string;
    filterValue: string;
    searchField: string;
    searchValue: string;
    filterSet: number;
    filterRecordsPerSet: number;
    orderField: string;
    orderType: "asc" | "desc";
    filterValueOptionsShown: string[];
    pageShown: number;
    queriedCount: number;
    unQueriedCount: number;
  };
  errorLog: ErrorLogStructure[];
  urlPage: string;
  storeLog: { date: string; user: string; log: {} };
};

export const initialState: AppStateStructure = {
  queryInput: {
    filterCollection: "initial",
    filterField: "initial",
    filterValue: "(select all)",
    searchField: "initial",
    searchValue: "",
    filterSet: 1,
    filterRecordsPerSet: 4,
    orderField: "initial",
    orderType: "asc",
    filterValueOptionsShown: ["initial"],
    pageShown: 1,
    queriedCount: 10,
    unQueriedCount: 10,
  },

  errorLog: [
    {
      date: new Date().toString(),
      user: "No error",
      origin: "No error",
      errorName: "No error",
      errorStack: "No error",
      errorMessage: "No error",
      errorCause: "No error",
    },
  ],
  urlPage: "No error",

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
