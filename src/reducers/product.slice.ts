import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductStructure } from "../models/collections.model";
import { asyncLoadProductsGallery } from "./product.thunks";

export type ProductStateStructure = {
  filteredGallery: ProductStructure[];
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
  unFilteredCount: number;
  detailCredentials: string;
  detail: ProductStructure[];
};

export const initialState: ProductStateStructure = {
  filteredGallery: [],
  filter: {
    filterField: "brand",

    filterValue: "(select all)",
    filterSet: 1,
    filterRecordsPerSet: 4,
    orderField: "shortDescription",
    orderType: "asc",
  },
  filterOptions: ["brand"],
  filteredPage: 1,
  filteredCount: 0,
  unFilteredCount: 0,
  detailCredentials: "sku/unknown",
  detail: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadGallery(
      state: ProductStateStructure,
      action: PayloadAction<ProductStructure[]>
    ) {
      state.filteredGallery = action.payload;
    },
    loadFilter(
      state: ProductStateStructure,
      action: PayloadAction<typeof initialState.filter>
    ) {
      state.filter = action.payload;
    },
    loadFilterOptions(state: ProductStateStructure, action: PayloadAction<[]>) {
      state.filterOptions = action.payload;
    },
    loadFilteredPage(
      state: ProductStateStructure,
      action: PayloadAction<number>
    ) {
      state.filteredPage = action.payload;
    },
    loadFilteredCount(
      state: ProductStateStructure,
      action: PayloadAction<number>
    ) {
      state.filteredCount = action.payload;
    },

    loadUnFilteredCount(
      state: ProductStateStructure,
      action: PayloadAction<number>
    ) {
      state.unFilteredCount = action.payload;
    },
    loadDetailCredentials(
      state: ProductStateStructure,
      action: PayloadAction<string>
    ) {
      state.detailCredentials = action.payload;
    },
    loadDetail(
      state: ProductStateStructure,
      action: PayloadAction<ProductStructure[]>
    ) {
      state.detail = action.payload;
    },
  },

  extraReducers(builder) {
    builder.addCase(asyncLoadProductsGallery.pending, (state) => {
      //To change state variables in async processes: state.loadingUsersStatus = "loading";
    });
    builder.addCase(asyncLoadProductsGallery.fulfilled, (state, action) => {
      state.filteredGallery = action.payload.results;

      //To change state variables in async processes: state.loadingUsersStatus = "idle";
    });
    builder.addCase(asyncLoadProductsGallery.rejected, (state) => {
      //To change state variables in async processes: state.loadingUsersStatus = "error";
    });
  },
});

export const {
  loadGallery,
  loadFilter,
  loadFilterOptions,
  loadFilteredPage,
  loadFilteredCount,
  loadUnFilteredCount,
  loadDetailCredentials,
  loadDetail,
} = productSlice.actions;

export const productReducer = productSlice.reducer;
