import { PayloadAction } from "@reduxjs/toolkit";

import {
  collectionReducer,
  CollectionStateStructure,
} from "./collection.slice";
import {
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";

const mockInitialState = {} as CollectionStateStructure;

const mockFinalState = {} as CollectionStateStructure;

describe("Given the collectionSlice", () => {
  describe("When the method queryInput is called", () => {
    test("Then it should update the queryInput property of collectionState to the mock payload", () => {
      const mockAction: PayloadAction<QueryInputCollectionStructure> = {
        type: "collection/queryInput",
        payload: mockInitialState.queryInput,
      };
      const element = collectionReducer(mockInitialState, mockAction);
      expect(element.queryInput).toEqual(mockFinalState.queryInput);
    });
  });

  describe("When the method queryOutput is called", () => {
    test("Then it should update the queryOutput property of collectionState to the mock payload", () => {
      const mockAction: PayloadAction<QueryOutputCollectionStructure> = {
        type: "collection/queryOutput",
        payload: mockInitialState.queryOutput,
      };
      const element = collectionReducer(mockInitialState, mockAction);
      expect(element.queryOutput).toEqual(mockFinalState.queryOutput);
    });
  });
});
