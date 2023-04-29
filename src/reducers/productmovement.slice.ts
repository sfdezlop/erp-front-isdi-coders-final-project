import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductMovementStructure } from "../models/productmovement.model";
import { StockServerResponseType } from "../models/serverresponse.model";

export type ProductMovementStateStructure = {
  filteredGallery: ProductMovementStructure[];
  filter: {
    filterField: string;
    filterValue: string;
    filterSet: number;
    filterRecordsPerSet: number;
    orderField: string;
    orderType: "asc" | "desc";
  };
  filterOptions: string[];
  filteredPage: number;
  filteredCount: number;
  unfilteredCount: number;
  analytics: any[];
  stock: { _id: string; stock: number }[];
};

export const initialState: ProductMovementStateStructure = {
  filteredGallery: [],
  filter: {
    filterField: "type",
    filterValue: "(select all)",
    filterSet: 1,
    filterRecordsPerSet: 10,
    orderField: "date",
    orderType: "desc",
  },
  filterOptions: ["type"],
  filteredPage: 1,
  filteredCount: 1,
  unfilteredCount: 1,
  analytics: [],
  stock: [],
};

export const productMovementSlice = createSlice({
  name: "productMovement",
  initialState,

  reducers: {
    loadGallery(
      state: ProductMovementStateStructure,
      action: PayloadAction<ProductMovementStructure[]>
    ) {
      state.filteredGallery = action.payload;
    },
    loadFilter(
      state: ProductMovementStateStructure,
      action: PayloadAction<typeof initialState.filter>
    ) {
      state.filter = action.payload;
    },
    loadFilterOptions(
      state: ProductMovementStateStructure,
      action: PayloadAction<[]>
    ) {
      state.filterOptions = action.payload;
    },
    loadFilteredPage(
      state: ProductMovementStateStructure,
      action: PayloadAction<number>
    ) {
      state.filteredPage = action.payload;
    },
    loadFilteredCount(
      state: ProductMovementStateStructure,
      action: PayloadAction<number>
    ) {
      state.filteredCount = action.payload;
    },
    loadUnfilteredCount(
      state: ProductMovementStateStructure,
      action: PayloadAction<number>
    ) {
      state.unfilteredCount = action.payload;
    },
    loadAnalytics(
      state: ProductMovementStateStructure,
      action: PayloadAction<typeof initialState.analytics>
    ) {
      state.analytics = action.payload;
    },
    loadStock(
      state: ProductMovementStateStructure,
      action: PayloadAction<StockServerResponseType>
    ) {
      state.stock = action.payload.results;
    },
  },
});

export const {
  loadGallery,
  loadFilter,
  loadFilterOptions,
  loadFilteredPage,
  loadFilteredCount,
  loadUnfilteredCount,
  loadAnalytics,
  loadStock,
} = productMovementSlice.actions;

export const productMovementReducer = productMovementSlice.reducer;
