import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductMovementStructure } from "../models/productmovement.model";

export type ProductMovementStateStructure = {
  filteredGallery: ProductMovementStructure[];
  filter: {
    filterField: string;
    filterValue: string;
    filterSet: number;
    filterRecordsPerSet: number;
    orderField: string;
  };
  filteredPage: number;
  filteredCount: number;
  unfilteredCount: number;
  analytics: any[];
};

export const initialState: ProductMovementStateStructure = {
  filteredGallery: [],
  filter: {
    filterField: "productSku",
    filterValue: "90110",
    filterSet: 1,
    filterRecordsPerSet: 200,
    orderField: "date",
  },
  filteredPage: 1,
  filteredCount: 100,
  unfilteredCount: 100,
  analytics: [],
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
  },
});

export const {
  loadGallery,
  loadFilter,
  loadFilteredPage,
  loadFilteredCount,
  loadUnfilteredCount,
  loadAnalytics,
} = productMovementSlice.actions;

export const productMovementReducer = productMovementSlice.reducer;
