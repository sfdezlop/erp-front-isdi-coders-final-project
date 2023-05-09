import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QueryFieldsCollectionStructure,
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";

export type CollectionStateStructure = {
  queryFields: QueryFieldsCollectionStructure;
  queryInput: QueryInputCollectionStructure;
  queryOutput: QueryOutputCollectionStructure;
};

export const initialState: CollectionStateStructure = {
  queryFields: {
    collections: ["products", "productmovements"],
    filterableFields: ["products_-_brand", "products_-_userCreator"],
    searchableFields: ["products_-_brand", "products_-_sku"],
    orderableFields: ["products_-_brand", "products_-_sku"],
  },
  queryInput: {
    filterCollection: "products",
    filterField: "brand",
    filterValue: "(select all)",
    searchField: "brand",
    searchValue: "",
    searchType: "Contains",
    querySet: 1,
    queryRecordsPerSet: 4,
    orderField: "brand",
    orderType: "asc",
    primaryKey: "sku",
    primaryKeyValue: "",
  },
  queryOutput: {
    filterValueOptionsShown: ["Flores de Bach", "Yogi Tea"],
    pageShown: 1,
    queriedCount: 1,
    unQueriedCount: 1,
    gallery: [
      {
        id: "id",
        sku: "Sku",
        shortDescription: "Short Description",
        longDescription: "Long Description",
        ean: "EAN",
        brand: "Brand",
        image: "Image",
        userCreatorEmail: "User Creator Email",
        costPerUnit: 0,
        pricePerUnit: 0,
      },
    ],
    detail: [
      {
        id: "id",
        sku: "Sku",
        shortDescription: "Short Description",
        longDescription: "Long Description",
        ean: "EAN",
        brand: "Brand",
        image: "Image",
        userCreatorEmail: "User Creator Email",
        costPerUnit: 0,
        pricePerUnit: 0,
      },
    ],
  },
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    queryFields(
      state: CollectionStateStructure,
      action: PayloadAction<QueryFieldsCollectionStructure>
    ) {
      state.queryFields = action.payload;
    },
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

export const { queryFields, queryInput, queryOutput } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
