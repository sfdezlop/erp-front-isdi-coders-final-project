/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { ProductMovementsRepo } from "../services/repositories/productmovement.repo";
import { useProductMovements } from "./use.productmovements";
import { ProductMovementStateStructure } from "../reducers/productmovement.slice";
import {
  ProductMovementServerResponseType,
  StockServerResponseType,
} from "../models/serverresponse.model";
import { store } from "../store/store";
import { ProductMovementStructure } from "../models/collections.model";

describe("Given the useProducts hook", () => {
  let mockPayload: ProductMovementStateStructure;
  let mockRepo: ProductMovementsRepo;
  let mockResponse: ProductMovementServerResponseType;
  let mockStockResponse: StockServerResponseType;
  let mockProductMovement: Partial<ProductMovementStructure>;

  beforeEach(async () => {
    mockPayload = {
      filteredGallery: [],
      filter: {
        filterField: "mockFilterField",

        filterValue: "mockFilterValue",
        filterSet: 123,
        filterRecordsPerSet: 321,
        orderField: "mockOrderField",
      },
      filterOptions: ["mockFilterOptions"],
      filteredPage: 123456,
      filteredCount: 787,
      unFilteredCount: 589,
      analytics: [],
      stock: {
        _id: "mockSku",
        stock: 22,
      },
    } as unknown as ProductMovementStateStructure;

    mockRepo = {
      readFilteredGallery: jest.fn(),
      readFilteredCount: jest.fn(),
      readAnalytics: jest.fn(),
      stockBySku: jest.fn(),
      create: jest.fn(),
      deleteByKey: jest.fn(),
      deleteById: jest.fn(),
      stock: jest.fn(),
    } as unknown as ProductMovementsRepo;

    mockResponse = {
      results: [],
    } as unknown as ProductMovementServerResponseType;

    mockStockResponse = {
      results: [{ _id: "mockId", stock: 77 }],
    } as unknown as StockServerResponseType;

    mockProductMovement = {
      id: "mockId",
    };

    const TestComponent = function () {
      const {
        gallery,
        filter,
        paginate,
        dashboardProductMovements,
        showStockBySku,
        create,
        deleteByKey,
        deleteById,
      } = useProductMovements(mockRepo);

      return (
        <>
          <button onClick={() => gallery()}>galleryProductMovement</button>
          <button onClick={() => filter(mockPayload.filter)}>
            filterProductMovements
          </button>
          <button onClick={() => paginate(mockPayload.filteredPage)}>
            paginateProductMovements
          </button>
          <button onClick={() => dashboardProductMovements()}>
            dashboardProductMovements
          </button>
          <button onClick={() => showStockBySku("mockSku")}>
            showStockBySku
          </button>
          <button onClick={() => create(mockProductMovement)}>create</button>
          <button
            onClick={() => deleteByKey({ key: "mockKey", value: "mockValue" })}
          >
            deleteByKey
          </button>
          <button onClick={() => deleteById("mockId")}>deleteById</button>
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
    test("Then the 8 buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements.length).toEqual(8);
    });
  });

  describe("When the gallery button of TestComponent is clicked", () => {
    test("Then the readFilteredGallery and readFilteredCount methods of the repo should have been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.readFilteredGallery as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );
      (mockRepo.readFilteredCount as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );

      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.readFilteredGallery).toHaveBeenCalled();
      expect(mockRepo.readFilteredCount).toHaveBeenCalled();
    });
  });

  describe("When the filter button of TestComponent is clicked", () => {
    test("Then the loadFilter action should be dispatched changing the value of filter property of productMovementState to mockId", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      const filterData = store.getState().productMovementState.filter;

      expect(filterData.filterField).toEqual("mockFilterField");
    });
  });

  describe("When the paginate button of TestComponent is clicked", () => {
    test("Then the loadFilteredPage action should be dispatched changing the value of filteredPage property of productMovementState to mockId", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[2]));
      const filteredPageData =
        store.getState().productMovementState.filteredPage;

      expect(filteredPageData).toEqual(123456);
    });
  });

  describe("When the dashboardProductMovements button of TestComponent is clicked", () => {
    test("Then the readAnalytics and readFilteredCount methods of the repo should have been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.readAnalytics as jest.Mock).mockResolvedValueOnce(mockResponse);
      (mockRepo.readFilteredCount as jest.Mock).mockReturnValueOnce(
        mockResponse
      );
      await act(async () => userEvent.click(elements[3]));
      expect(mockRepo.readAnalytics).toHaveBeenCalled();
      expect(mockRepo.readFilteredCount).toHaveBeenCalled();
    });
  });

  describe("When the showStockBySku button of TestComponent is clicked", () => {
    test("Then the stockBySku method of the repo should has been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.stockBySku as jest.Mock).mockResolvedValueOnce(mockResponse);
      await act(async () => userEvent.click(elements[4]));

      expect(mockRepo.stockBySku).toHaveBeenCalled();
    });
  });

  describe("When the create button of TestComponent is clicked", () => {
    test("Then the create method of the repo should has been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(mockProductMovement);

      await act(async () => userEvent.click(elements[5]));

      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe("When the deleteByKey button of TestComponent is clicked", () => {
    test("Then the deleteByKey method of the repo should has been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(mockProductMovement);

      await act(async () => userEvent.click(elements[6]));

      expect(mockRepo.deleteByKey).toHaveBeenCalled();
    });
  });

  describe("When the deleteById button of TestComponent is clicked", () => {
    test("Then the deleteById method of the repo should has been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(mockProductMovement);

      await act(async () => userEvent.click(elements[7]));

      expect(mockRepo.deleteById).toHaveBeenCalled();
    });
  });
});
