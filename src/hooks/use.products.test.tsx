/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";

import { ProductsRepo } from "../services/repositories/product.repo";
import { useProducts } from "./use.products";
import { ProductStateStructure } from "../reducers/product.slice";
import { ProductServerResponseType } from "../models/serverresponse.model";
import { store } from "../store/store";

describe("Given the useProducts hook", () => {
  let mockPayload: ProductStateStructure;
  let mockRepo: ProductsRepo;
  let mockResponse: ProductServerResponseType;

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
      detailCredentials: "mockDetailCredentials",
      detail: [],
    } as unknown as ProductStateStructure;

    mockRepo = {
      readFilteredGallery: jest.fn(),
      readFilteredCount: jest.fn(),
      readGroupsByField: jest.fn(),
      readDetail: jest.fn(),
      create: jest.fn(),
      deleteByKey: jest.fn(),
      deleteById: jest.fn(),
    } as unknown as ProductsRepo;

    mockResponse = {
      results: [],
    } as unknown as ProductServerResponseType;

    const TestComponent = function () {
      const {
        galleryProduct,
        detailCredentials,
        detail,
        filterProducts,
        paginateProducts,
        addSampleProducts,
        deleteByKeyProducts,
        deleteByIdProducts,
      } = useProducts(mockRepo);

      return (
        <>
          <button onClick={() => galleryProduct()}>galleryProduct</button>
          <button
            onClick={() => detailCredentials(mockPayload.detailCredentials)}
          >
            detailCredentials
          </button>
          <button onClick={() => detail(mockPayload.detailCredentials)}>
            detail
          </button>
          <button onClick={() => filterProducts(mockPayload.filter)}>
            filterProducts
          </button>
          <button onClick={() => paginateProducts(mockPayload.filteredPage)}>
            paginateProducts
          </button>
          <button onClick={() => addSampleProducts({ id: "mockId" })}>
            addSampleProducts
          </button>
          <button
            onClick={() =>
              deleteByKeyProducts({ key: "mockField", value: "mockValue" })
            }
          >
            deleteByKeyProducts
          </button>
          <button onClick={() => deleteByIdProducts("mockId")}>
            deleteByIdProducts
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
    test("Then the 8 buttons should be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements.length).toEqual(8);
    });
  });

  describe("When the galleryProduct button of TestComponent is clicked", () => {
    test("Then the readFilteredGallery, readFilteredCount and readGroupsByField methods of the repo should been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.readFilteredGallery as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );
      (mockRepo.readFilteredCount as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );
      (mockRepo.readGroupsByField as jest.Mock).mockResolvedValueOnce(
        mockResponse
      );
      await act(async () => userEvent.click(elements[0]));
      expect(mockRepo.readFilteredGallery).toHaveBeenCalled();
      expect(mockRepo.readFilteredCount).toHaveBeenCalled();
      expect(mockRepo.readGroupsByField).toHaveBeenCalled();
    });
  });

  describe("When the detailCredentials button of TestComponent is clicked", () => {
    test("Then the loadDetailCredentials action should be dispatched changing the value of detailCredentials property of productState to mockId", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => userEvent.click(elements[1]));
      const detailCredentialsData =
        store.getState().productState.detailCredentials;

      expect(detailCredentialsData).toEqual("mockDetailCredentials");
    });
  });

  describe("When the detail button of TestComponent is clicked", () => {
    test("Then the readDetail method of the repo should been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.readDetail as jest.Mock).mockResolvedValueOnce(mockResponse);

      await act(async () => userEvent.click(elements[2]));
      expect(mockRepo.readDetail).toHaveBeenCalled();
    });
  });

  describe("When the filterProducts button of TestComponent is clicked", () => {
    test("Then the loadFilter action should be dispatched changing the value of filter property of productState", async () => {
      const elements = await screen.findAllByRole("button");

      await act(async () => userEvent.click(elements[3]));
      const filterData = store.getState().productState.filter;

      expect(filterData.filterRecordsPerSet).toEqual(321);
    });
  });

  describe("When the paginateProducts button of TestComponent is clicked", () => {
    test("Then the loadFilteredPage action should be dispatched changing the value of filteredPage property of productState", async () => {
      const elements = await screen.findAllByRole("button");

      await act(async () => userEvent.click(elements[4]));
      const filteredPageData = store.getState().productState.filteredPage;

      expect(filteredPageData).toEqual(123456);
    });
  });

  describe("When the addSampleProducts button of TestComponent is clicked", () => {
    test("Then the create method of the repo should been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.create as jest.Mock).mockResolvedValueOnce(mockResponse);

      await act(async () => userEvent.click(elements[5]));

      expect(mockRepo.create).toHaveBeenCalled();
    });
  });

  describe("When the deleteByKeyProducts button of TestComponent is clicked", () => {
    test("Then the deleteByKey method of the repo should been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.deleteByKey as jest.Mock).mockResolvedValueOnce(mockResponse);

      await act(async () => userEvent.click(elements[6]));

      expect(mockRepo.deleteByKey).toHaveBeenCalled();
    });
  });

  describe("When the deleteByIdProducts button of TestComponent is clicked", () => {
    test("Then the deleteByKey method of the repo should been called", async () => {
      const elements = await screen.findAllByRole("button");
      (mockRepo.deleteById as jest.Mock).mockResolvedValueOnce(mockResponse);

      await act(async () => userEvent.click(elements[7]));

      expect(mockRepo.deleteById).toHaveBeenCalled();
    });
  });
});
