import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppCollectionFieldStructure,
  QueryFieldsCollectionStructure,
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
  TranslationStructure,
} from "../models/collections.model";
import { stringSeparator } from "../config";

export type CollectionStateStructure = {
  queryFields: QueryFieldsCollectionStructure;
  queryInput: QueryInputCollectionStructure;
  queryOutput: QueryOutputCollectionStructure;
  translations: TranslationStructure[];
  appCollectionFields: AppCollectionFieldStructure[];
};

const initialStateFormCongruency = {
  queryFields: {
    collections: ["products"],
    filterableFields: ["products" + stringSeparator + "brand"],
    searchableFields: ["products" + stringSeparator + "sku"],
    orderableFields: ["products" + stringSeparator + "ean"],
  },
};

export const recordsPerSet = [4, 8, 16, 32, 64, 128, 256];

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
        stringSeparator
      )[1],
    filterValue: "",
    searchField:
      initialStateFormCongruency.queryFields.searchableFields[0].split(
        stringSeparator
      )[1],
    searchValue: "",
    searchType: "Contains",
    querySet: 1,
    queryRecordsPerSet: recordsPerSet[0],
    orderField:
      initialStateFormCongruency.queryFields.orderableFields[0].split(
        stringSeparator
      )[1],
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
    galleryInterface: "raw",
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
    detailInterface: "raw",
  },
  translations: [],
  appCollectionFields: [],
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
    translations(
      state: CollectionStateStructure,
      action: PayloadAction<TranslationStructure[]>
    ) {
      state.translations = action.payload;
    },
    appCollectionFields(
      state: CollectionStateStructure,
      action: PayloadAction<AppCollectionFieldStructure[]>
    ) {
      state.appCollectionFields = action.payload;
    },
  },
});

export const {
  queryFields,
  queryInput,
  queryOutput,
  translations,
  appCollectionFields,
} = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
