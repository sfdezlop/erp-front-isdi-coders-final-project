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
import { ProductMovementStructure } from "../models/productmovement.model";

describe("Given the useProducts hook", () => {
  let mockPayload: ProductMovementStateStructure;
  let mockRepo: ProductMovementsRepo;
  let mockResponse: ProductMovementServerResponseType;
  let mockStockResponse: StockServerResponseType;
  let mockProductMovement: ProductMovementStructure;

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
      addProductMovement: jest.fn(),
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
      // productSku: "mockProductSku",
      // batch: "mockBatch",
      // date: "mockDate",
      // type: "mockType",
      // typeId: "mockTypeId",
      // store: "mockStore",
      // units: 11,
      // costPerUnit: 22,
      // pricePerUnit: 33,
    };

    const TestComponent = function () {
      const {
        galleryProductMovement,
        filterProductMovements,
        paginateProductMovements,
        dashboardProductMovements,
        showStockBySku,
        addProductMovement,
        stock,
      } = useProductMovements(mockRepo);

      return (
        <>
          <button onClick={() => galleryProductMovement()}>
            galleryProductMovement
          </button>
          <button onClick={() => filterProductMovements(mockPayload.filter)}>
            filterProductMovements
          </button>
          <button
            onClick={() => paginateProductMovements(mockPayload.filteredPage)}
          >
            paginateProductMovements
          </button>
          <button onClick={() => dashboardProductMovements()}>
            dashboardProductMovements
          </button>
          <button onClick={() => showStockBySku("mockSku")}>
            showStockBySku
          </button>
          <button onClick={() => addProductMovement(mockProductMovement)}>
            addProductMovement
          </button>
          <button onClick={() => stock()}>stock</button>
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
    test("Then the 7 buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements.length).toEqual(7);
    });
  });

  describe("When the galleryProductMovement button of TestComponent is clicked", () => {
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

  describe("When the filterProductMovements button of TestComponent is clicked", () => {
    test("Then the loadFilter action should be dispatched changing the value of filter property of productMovementState to mockId", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      const filterData = store.getState().productMovementState.filter;

      expect(filterData.filterField).toEqual("mockFilterField");
    });
  });

  describe("When the paginateProductMovements button of TestComponent is clicked", () => {
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
      (mockRepo.readFilteredCount as jest.Mock).mockResolvedValueOnce(
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

  describe("When the addProductMovement button of TestComponent is clicked", () => {
    test("Then the addProductMovement method of the repo should has been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.addProductMovement as jest.Mock).mockResolvedValueOnce(
        mockProductMovement
      );

      await act(async () => userEvent.click(elements[5]));

      expect(mockRepo.addProductMovement).toHaveBeenCalled();
    });
  });

  describe("When the stock button of TestComponent is clicked", () => {
    test("Then the stock method of the repo should been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.stock as jest.Mock).mockResolvedValueOnce(mockStockResponse);

      await act(async () => userEvent.click(elements[6]));

      expect(mockRepo.stock).toHaveBeenCalled();
    });
  });
});
