import { PayloadAction } from "@reduxjs/toolkit";

import {
  productMovementReducer,
  ProductMovementStateStructure,
} from "./productmovement.slice";
import { ProductMovementStructure } from "../models/productmovement.model";
import { Filter } from "../services/repositories/product.repo";

const mockInitialState: ProductMovementStateStructure = {
  filteredGallery: [] as ProductMovementStructure[],
  filter: {
    filterField: "",
    filterValue: "",
    filterSet: 1,
    filterRecordsPerSet: 1,
    orderField: "",
    orderType: "asc",
  },
  filterOptions: [""],
  filteredPage: 1,
  filteredCount: 1,
  unfilteredCount: 1,
  analytics: [],
  stock: [{ _id: "", stock: 0 }],
};

const mockFinalState: ProductMovementStateStructure = {
  filteredGallery: [
    {
      id: "mock",
      productSku: "mock",
      batch: "mock",
      date: "mock",
      type: "mock",
      typeId: "mock",
      store: "mock",
      units: 11,
      costPerUnit: 22,
      pricePerUnit: 33,
    },
  ] as ProductMovementStructure[],
  filter: {
    filterField: "mock",
    filterValue: "mock",
    filterSet: 44,
    filterRecordsPerSet: 55,
    orderField: "mock",
    orderType: "asc",
  },
  filterOptions: ["mock"],
  filteredPage: 66,
  filteredCount: 77,
  unfilteredCount: 88,
  analytics: ["mock"],
  stock: [{ _id: "mock", stock: 99 }],
};

describe("Given the productMovementSlice", () => {
  describe("When the method loadGallery is called", () => {
    test("Then it should update the filteredGallery property of productMovementState to the mock payload", () => {
      const mockAction: PayloadAction<ProductMovementStructure[]> = {
        type: "productMovement/loadGallery",
        payload: mockFinalState.filteredGallery,
      };
      const element = productMovementReducer(mockInitialState, mockAction);
      expect(element.filteredGallery).toEqual(mockFinalState.filteredGallery);
    });
  });

  describe("When the method loadFilter is called", () => {
    test("Then it should update the filter property of productMovementState to the mock payload", () => {
      const mockAction: PayloadAction<Filter> = {
        type: "productMovement/loadFilter",
        payload: mockFinalState.filter,
      };
      const element = productMovementReducer(mockInitialState, mockAction);
      expect(element.filter).toEqual(mockFinalState.filter);
    });
  });

  describe("When the method loadFilterOptions is called", () => {
    test("Then it should update the filterOptions property of productMovementState to the mock payload", () => {
      const mockAction: PayloadAction<string[]> = {
        type: "productMovement/loadFilterOptions",
        payload: mockFinalState.filterOptions,
      };
      const element = productMovementReducer(mockInitialState, mockAction);
      expect(element.filterOptions).toEqual(mockFinalState.filterOptions);
    });
  });

  describe("When the method loadFilteredPage is called", () => {
    test("Then it should update the filteredPage property of productMovementState to the mock payload", () => {
      const mockAction: PayloadAction<number> = {
        type: "productMovement/loadFilteredPage",
        payload: mockFinalState.filteredPage,
      };
      const element = productMovementReducer(mockInitialState, mockAction);
      expect(element.filteredPage).toEqual(mockFinalState.filteredPage);
    });
  });

  describe("When the method loadFilteredCount is called", () => {
    test("Then it should update the filteredCount property of productMovementState to the mock payload", () => {
      const mockAction: PayloadAction<number> = {
        type: "productMovement/loadFilteredCount",
        payload: mockFinalState.filteredCount,
      };
      const element = productMovementReducer(mockInitialState, mockAction);
      expect(element.filteredCount).toEqual(mockFinalState.filteredCount);
    });
  });

  describe("When the method loadUnfilteredCount is called", () => {
    test("Then it should update the unfilteredCount property of productMovementState to the mock payload", () => {
      const mockAction: PayloadAction<number> = {
        type: "productMovement/loadUnfilteredCount",
        payload: mockFinalState.unfilteredCount,
      };
      const element = productMovementReducer(mockInitialState, mockAction);
      expect(element.unfilteredCount).toEqual(mockFinalState.unfilteredCount);
    });
  });

  describe("When the method loadAnalytics is called", () => {
    test("Then it should update the analytics property of productMovementState to the mock payload", () => {
      const mockAction: PayloadAction<typeof mockInitialState.analytics> = {
        type: "productMovement/loadAnalytics",
        payload: mockFinalState.analytics,
      };
      const element = productMovementReducer(mockInitialState, mockAction);
      expect(element.analytics).toEqual(mockFinalState.analytics);
    });
  });
});

//Pending test: Review the payload definition at loadStock (.results)
// describe("When the method loadStock is called", () => {
//   test("Then it should update the detail property of productMovementState to the mock payload", () => {
//     const mockAction: PayloadAction<any[]> = {
//       type: "productMovement/loadStock",
//       payload: mockFinalState.stock,
//     };
//     const element = productMovementReducer(mockInitialState, mockAction);
//     expect([{ _id: "mock", stock: 99 }]).toEqual(mockFinalState.stock);
//   });
// });
