/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { CollectionsRepo } from "../services/repositories/collection.repo";
import { useCollections } from "./use.collections";
import { CollectionStateStructure } from "../reducers/collection.slice";

import { store } from "../store/store";

describe("Given the useCollection hook", () => {
  let mockPayload: CollectionStateStructure;
  let mockRepo: CollectionsRepo;
  let mockResponse: object[];

  beforeEach(async () => {
    mockPayload = {
      queryInput: {},
      queryOutput: {},
    } as unknown as CollectionStateStructure;

    mockRepo = {
      read: jest.fn(),
    } as unknown as CollectionsRepo;

    mockResponse = [{ id: "mock" }];

    const TestComponent = function () {
      const { updateQueryInput, updateQueryOutput } = useCollections(mockRepo);

      return (
        <>
          <button onClick={() => updateQueryInput(mockPayload.queryInput)}>
            updateQueryInput
          </button>
          <button onClick={() => updateQueryOutput(mockPayload.queryOutput)}>
            updateQueryOutput
          </button>
        </>
      );
    };

    await act(async () =>
      render(
        <>
          <Provider store={store}>
            <TestComponent></TestComponent>
          </Provider>
        </>
      )
    );
  });

  describe("When the TestComponent is rendered", () => {
    test("Then the 2 buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements.length).toEqual(2);
    });
  });

  describe("When the updateQueryInput button of TestComponent is clicked", () => {
    test("Then the read method of the repo should be called, and the value of queryInput property of collectionState should be the mockPayload", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.read as jest.Mock).mockResolvedValueOnce(mockResponse);
      await act(async () => userEvent.click(elements[0]));
      const queryInput = store.getState().collectionState.queryInput;

      expect(queryInput).toEqual(mockPayload.queryInput);
      expect(mockRepo.read).toHaveBeenCalled();
    });
  });

  describe("When the updateQueryOutput button of TestComponent is clicked", () => {
    test("Then the value of queryOutput property of collectionState should be the mockPayload", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      const queryOutput = store.getState().collectionState.queryOutput;

      expect(queryOutput).toEqual(mockPayload.queryOutput);
    });
  });
});
