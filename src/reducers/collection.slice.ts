import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";

export type CollectionStateStructure = {
  queryInput: QueryInputCollectionStructure;
  queryOutput: QueryOutputCollectionStructure;
};

export const initialState: CollectionStateStructure = {
  queryInput: {
    filterCollection: "products",
    filterField: "brand",
    filterValue: "(select all)",
    searchField: "sku",
    searchValue: "",
    searchType: "Contains",
    querySet: 1,
    queryRecordsPerSet: 4,
    orderField: "sku",
    orderType: "asc",
    primaryKey: "sku",
    primaryKeyValue: "0000",
  },
  queryOutput: {
    filterValueOptionsShown: ["Flores de Bach", "Yogi Tea", "Compra"],
    pageShown: 1,
    queriedCount: 1,
    unQueriedCount: 1,
    gallery: [],
    detail: [],
  },
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    queryInput(
      state: CollectionStateStructure,
      action: PayloadAction<QueryInputCollectionStructure>
    ) {
      state.queryInput = action.payload;
    },
    queryOutput(
      state: CollectionStateStructure,
      action: PayloadAction<QueryOutputCollectionStructure>
    ) {
      state.queryOutput = action.payload;
    },
  },
});

export const { queryInput, queryOutput } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
