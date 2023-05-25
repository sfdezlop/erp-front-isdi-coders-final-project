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
      queryFields: {},
      queryInput: {},
      queryOutput: {},
    } as unknown as CollectionStateStructure;

    mockRepo = {
      readRecords: jest.fn(),
      groupBy: jest.fn(),
      groupBySet: jest.fn(),
    } as unknown as CollectionsRepo;

    mockResponse = [{ id: "mock" }];

    const TestComponent = function () {
      const { updateQueryFields, updateQueryInput } = useCollections(mockRepo);

      return (
        <>
          <button onClick={() => updateQueryFields("mockControlInfo")}>
            updateQueryFields
          </button>
          <button
            onClick={() =>
              updateQueryInput(mockPayload.queryInput, "mockControlInfo")
            }
          >
            updateQueryInput
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

  describe("When the updateQueryFields button of TestComponent is clicked", () => {
    test("Then the groupBySet method of the repo should be called", async () => {
      const elements = await screen.findAllByRole("button");

      (mockRepo.groupBySet as jest.Mock).mockResolvedValueOnce(mockResponse);
      await act(async () => userEvent.click(elements[0]));

      expect(mockRepo.groupBySet).toHaveBeenCalled();
    });
  });
  describe("When the updateQueryInput button of TestComponent is clicked", () => {
    test("Then the readRecords method of the repo should be called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.readRecords as jest.Mock).mockResolvedValueOnce(mockResponse);
      await act(async () => userEvent.click(elements[1]));
      expect(mockRepo.readRecords).toHaveBeenCalled();
    });
  });
});
