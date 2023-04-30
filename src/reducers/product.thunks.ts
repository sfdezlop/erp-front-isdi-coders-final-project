import { createAsyncThunk } from "@reduxjs/toolkit";
import { Filter, ProductsRepo } from "../services/repositories/product.repo";
import { ProductServerResponseType } from "../models/serverresponse.model";

export const asyncLoadProductsGallery = createAsyncThunk<
  ProductServerResponseType,
  {
    token: string;
    urlExtraPath: string;
    filter: Filter;
    productRepo: ProductsRepo;
  }
>(
  "product/loadGallery",
  async ({ token, urlExtraPath, filter, productRepo }) => {
    const response = await productRepo.readFilteredGallery(
      token,
      urlExtraPath,
      filter
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
