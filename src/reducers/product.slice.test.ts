import { PayloadAction } from "@reduxjs/toolkit";

import { productReducer, ProductStateStructure } from "./product.slice";
import { ProductStructure } from "../models/collections.model";
import { Filter } from "../services/repositories/product.repo";

const mockInitialState: ProductStateStructure = {
  filteredGallery: [] as ProductStructure[],
  filter: {
    filterField: "",
    filterValue: "",
    filterSet: 0,
    filterRecordsPerSet: 0,
    orderField: "",
    orderType: "asc",
  },
  filterOptions: [""],
  filteredPage: 0,
  filteredCount: 0,
  unFilteredCount: 0,
  detailCredentials: "",
  detail: [] as ProductStructure[],
};

const mockFinalState: ProductStateStructure = {
  filteredGallery: [
    {
      id: "mock",
      sku: "mock",
      shortDescription: "mock",
      longDescription: "mock",
      ean: "mock",
      brand: "mock",
      image: "mock",
      userCreatorEmail: "mock",
      costPerUnit: 11,
      pricePerUnit: 22,
    },
  ] as ProductStructure[],
  filter: {
    filterField: "mock",
    filterValue: "mock",
    filterSet: 1,
    filterRecordsPerSet: 2,
    orderField: "mock",
    orderType: "asc",
  },
  filterOptions: ["mock"],
  filteredPage: 3,
  filteredCount: 4,
  unFilteredCount: 5,
  detailCredentials: "mock",
  detail: [
    {
      id: "mock",
      sku: "mock",
      shortDescription: "mock",
      longDescription: "mock",
      ean: "mock",
      brand: "mock",
      image: "mock",
      userCreatorEmail: "mock",
      costPerUnit: 11,
      pricePerUnit: 22,
    },
  ] as ProductStructure[],
};

describe("Given the productSlice", () => {
  describe("When the method loadGallery is called", () => {
    test("Then it should update the filteredGallery property of productState to the mock payload", () => {
      const mockAction: PayloadAction<ProductStructure[]> = {
        type: "product/loadGallery",
        payload: mockFinalState.filteredGallery,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.filteredGallery).toEqual(mockFinalState.filteredGallery);
    });
  });

  describe("When the method loadFilter is called", () => {
    test("Then it should update the filter property of productState to the mock payload", () => {
      const mockAction: PayloadAction<Filter> = {
        type: "product/loadFilter",
        payload: mockFinalState.filter,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.filter).toEqual(mockFinalState.filter);
    });
  });

  describe("When the method loadFilterOptions is called", () => {
    test("Then it should update the filterOptions property of productState to the mock payload", () => {
      const mockAction: PayloadAction<string[]> = {
        type: "product/loadFilterOptions",
        payload: mockFinalState.filterOptions,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.filterOptions).toEqual(mockFinalState.filterOptions);
    });
  });

  describe("When the method loadFilteredPage is called", () => {
    test("Then it should update the filteredPage property of productState to the mock payload", () => {
      const mockAction: PayloadAction<number> = {
        type: "product/loadFilteredPage",
        payload: mockFinalState.filteredPage,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.filteredPage).toEqual(mockFinalState.filteredPage);
    });
  });

  describe("When the method loadFilteredCount is called", () => {
    test("Then it should update the filteredCount property of productState to the mock payload", () => {
      const mockAction: PayloadAction<number> = {
        type: "product/loadFilteredCount",
        payload: mockFinalState.filteredCount,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.filteredCount).toEqual(mockFinalState.filteredCount);
    });
  });

  describe("When the method loadUnFilteredCount is called", () => {
    test("Then it should update the unFilteredCount property of productState to the mock payload", () => {
      const mockAction: PayloadAction<number> = {
        type: "product/loadUnFilteredCount",
        payload: mockFinalState.unFilteredCount,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.unFilteredCount).toEqual(mockFinalState.unFilteredCount);
    });
  });

  describe("When the method loadDetailCredentials is called", () => {
    test("Then it should update the detailCredentials property of productState to the mock payload", () => {
      const mockAction: PayloadAction<string> = {
        type: "product/loadDetailCredentials",
        payload: mockFinalState.detailCredentials,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.detailCredentials).toEqual(
        mockFinalState.detailCredentials
      );
    });
  });

  describe("When the method loadDetail is called", () => {
    test("Then it should update the detail property of productState to the mock payload", () => {
      const mockAction: PayloadAction<ProductStructure[]> = {
        type: "product/loadDetail",
        payload: mockFinalState.detail,
      };
      const element = productReducer(mockInitialState, mockAction);
      expect(element.detail).toEqual(mockFinalState.detail);
    });
  });
});
