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

export function useProducts(repo: ProductsRepo) {
  const productStateData = useSelector(
    (state: RootState) => state.productState
  );

  const userStateData = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();
  const tokenAtLocalStorage = localStorage.tokenERP;
  const tokenAtUserState = userStateData.userLoggedToken;
  const tokenToUse = tokenAtUserState;

  const { addError } = useApp();

  const galleryProduct = async () => {
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
      console.log((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  const detailCredentials = async (credential: string) => {
    await dispatch(loadDetailCredentials(credential));
  };

  const detail = async (id: string) => {
    try {
      const serverDetailResponse: any = await repo.readDetail(
        tokenToUse,
        "products/" + id
      );

      await dispatch(loadDetail(serverDetailResponse.results));
    } catch (error) {
      console.log((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  const filterProducts = async (filter: any) => {
    try {
      await dispatch(loadFilter(filter));
    } catch (error) {
      console.log((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  const paginateProducts = async (page: number) => {
    try {
      await dispatch(loadFilteredPage(page));
    } catch (error) {
      console.log((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  const addSampleProducts = async (newProduct: Partial<ProductStructure>) => {
    try {
      await repo.create(tokenToUse, newProduct);
    } catch (error) {
      console.log((error as Error).message);
      addError(error as Error, "/products/detail");
    }
  };

  const deleteByKeyProducts = async (query: { key: string; value: string }) => {
    try {
      await repo.deleteByKey(tokenToUse, query.key, query.value);
    } catch (error) {
      console.log((error as Error).message);
      addError(error as Error, "/products/detail");
    }
  };

  const deleteByIdProducts = async (id: string) => {
    try {
      await repo.deleteById(tokenToUse, id);
    } catch (error) {
      console.log((error as Error).message);
      addError(error as Error, "/products/detail");
    }
  };

  return {
    loadGallery,
    loadFilteredCount,
    loadDetail,
    loadFilterOptions,
    loadFilteredPage,
    galleryProduct,
    detailCredentials,
    detail,
    filterProducts,
    paginateProducts,
    addSampleProducts,
    deleteByKeyProducts,
    deleteByIdProducts,
  };
}
