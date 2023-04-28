import { useDispatch, useSelector } from "react-redux";
import { ProductsRepo } from "../services/repositories/product.repo";
import { AppDispatch, RootState } from "../store/store";
import {
  loadGallery,
  loadFilteredCount,
  loadDetail,
  loadDetailCredentials,
  loadFilterOptions,
  loadFilter,
  loadFilteredPage,
  loadUnFilteredCount,
} from "../reducers/product.slice";
import { ProductStructure } from "../models/product.model";
import { useApp } from "./use.app";
import { ProductServerResponseType } from "../models/serverresponse.model";

export function useProducts(repo: ProductsRepo) {
  const productStateData = useSelector(
    (state: RootState) => state.productState
  );

  const userStateData = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();
  const tokenAtUserState = userStateData.userLoggedToken;
  const tokenToUse = tokenAtUserState;

  const { addError } = useApp();

  const gallery = async () => {
    try {
      const serverGalleryResponse: any = await repo.readFilteredGallery(
        tokenToUse,
        "products/gallery",
        productStateData.filter
      );
      const serverFilteredCountResponse: any = await repo.readFilteredCount(
        tokenToUse,
        "products/count",
        productStateData.filter
      );
      const serverUnFilteredCountResponse: any = await repo.readFilteredCount(
        tokenToUse,
        "products/count",
        {}
      );
      const serverGroupByFieldResponse: any = await repo.readGroupsByField(
        tokenToUse,
        "products/group-values-per-field",
        "brand"
      );
      await dispatch(loadGallery(serverGalleryResponse.results));
      await dispatch(loadFilteredCount(serverFilteredCountResponse.results[0]));
      await dispatch(
        loadUnFilteredCount(serverUnFilteredCountResponse.results[0])
      );
      await dispatch(loadFilterOptions(serverGroupByFieldResponse.results));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  const detailCredentials = async (credential: string) => {
    await dispatch(loadDetailCredentials(credential));
  };

  const readDetailById = async (
    id: string
  ): Promise<ProductServerResponseType> => {
    try {
      const serverDetailResponse: any = await repo.readDetailById(
        tokenToUse,
        "products/" + id
      );
      await dispatch(loadDetail(serverDetailResponse.results));
      return serverDetailResponse.results;
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products");
      return { results: [] };
    }
  };

  const readDetailByKeyValue = async (
    urlExtraPathId: string
  ): Promise<ProductServerResponseType> => {
    try {
      const serverDetailResponse: any = await repo.readDetailByKeyValue(
        tokenToUse,
        "products/" + urlExtraPathId
      );
      return serverDetailResponse.results;
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products");
      return { results: [] };
    }
  };

  const microserviceQueryByKeyValue = async (urlExtraPathId: string) => {
    try {
      const result = await repo.microserviceQueryByKeyValue(
        tokenToUse,
        "products/" + urlExtraPathId
      );
      return result;
    } catch (error) {
      console.error((error as Error).message);
      return "Info not found";
      //To guard the correct functionality or ProductKeValue microservice, it always return a string
    }
  };

  const filter = async (filter: any) => {
    try {
      await dispatch(loadFilter(filter));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  const paginate = async (page: number) => {
    try {
      await dispatch(loadFilteredPage(page));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  const createSample = async (newProduct: Partial<ProductStructure>) => {
    try {
      await repo.create(tokenToUse, newProduct);
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products/detail");
    }
  };

  const deleteByKey = async (query: { key: string; value: string }) => {
    try {
      await repo.deleteByKey(tokenToUse, query.key, query.value);
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products/detail");
    }
  };

  const deleteById = async (id: string) => {
    try {
      await repo.deleteById(tokenToUse, id);
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products/detail");
    }
  };

  return {
    loadGallery,
    loadFilteredCount,
    loadDetail,
    loadFilterOptions,
    loadFilteredPage,
    gallery,
    detailCredentials,
    readDetailById,
    readDetailByKeyValue,
    microserviceQueryByKeyValue,
    filter,
    paginate,
    createSample,
    deleteByKey,
    deleteById,
  };
}
