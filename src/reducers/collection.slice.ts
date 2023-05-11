import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  QueryFieldsCollectionStructure,
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";
import { recordsPerSet } from "../components/query.collection/query.collection";

export type CollectionStateStructure = {
  queryFields: QueryFieldsCollectionStructure;
  queryInput: QueryInputCollectionStructure;
  queryOutput: QueryOutputCollectionStructure;
};

const initialStateFormCongruency = {
  queryFields: {
    collections: ["products"],
    filterableFields: ["products_-_brand"],
    searchableFields: ["products_-_sku"],
    orderableFields: ["products_-_ean"],
  },
};

export const initialState: CollectionStateStructure = {
  queryFields: {
    collections: initialStateFormCongruency.queryFields.collections,
    filterableFields: initialStateFormCongruency.queryFields.filterableFields,
    searchableFields: initialStateFormCongruency.queryFields.searchableFields,
    orderableFields: initialStateFormCongruency.queryFields.orderableFields,
  },
  queryInput: {
    filterCollection: initialStateFormCongruency.queryFields.collections[0],
    filterField:
      initialStateFormCongruency.queryFields.filterableFields[0].split(
        "_-_"
      )[1],
    filterValue: "",
    searchField:
      initialStateFormCongruency.queryFields.searchableFields[0].split(
        "_-_"
      )[1],
    searchValue: "",
    searchType: "Contains",
    querySet: 1,
    queryRecordsPerSet: recordsPerSet[0],
    orderField:
      initialStateFormCongruency.queryFields.orderableFields[0].split("_-_")[1],
    orderType: "asc",
    primaryKey: "",
    primaryKeyValue: "",
  },
  queryOutput: {
    filterValueOptionsShown: [],
    pageShown: 1,
    queriedCount: 1,
    unQueriedCount: 1,
    gallery: [
      {
        id: "123456",
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
