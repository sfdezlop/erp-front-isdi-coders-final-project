import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  loadGallery,
  loadFilter,
  loadFilterOptions,
  loadFilteredPage,
  loadFilteredCount,
  loadAnalytics,
  loadUnfilteredCount,
  loadStock,
} from "../reducers/productmovement.slice";

import { ProductMovementsRepo } from "../services/repositories/productmovement.repo";
import { useApp } from "./use.app";
import { ProductMovementStructure } from "../models/productmovement.model";

export function useProductMovements(repo: ProductMovementsRepo) {
  const productMovementStateData = useSelector(
    (state: RootState) => state.productMovementState
  );
  const userStateData = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();

  const tokenAtUserState = userStateData.userLoggedToken;
  const tokenToUse = tokenAtUserState;

  const { addError } = useApp();

  const galleryProductMovement = async () => {
    try {
      const serverGalleryResponse: any = await repo.readFilteredGallery(
        tokenToUse,
        "productmovements/gallery",
        productMovementStateData.filter
      );
      const serverFilteredCountResponse: any = await repo.readFilteredCount(
        tokenToUse,
        "productmovements/count",
        productMovementStateData.filter
      );

      const serverUnFilteredCountResponse: any = await repo.readFilteredCount(
        tokenToUse,
        "productmovements/count",
        {}
      );

      const serverGroupByFieldResponse: any = await repo.readGroupsByField(
        tokenToUse,
        "productmovements/group-values-per-field",
        "type"
      );
      await dispatch(loadGallery(serverGalleryResponse.results));
      await dispatch(loadFilteredCount(serverFilteredCountResponse.results[0]));
      await dispatch(
        loadUnfilteredCount(serverUnFilteredCountResponse.results[0])
      );
      await dispatch(loadFilterOptions(serverGroupByFieldResponse.results));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/productmovements");
    }
  };

  const filterProductMovements = async (filter: any) => {
    try {
      await dispatch(loadFilter(filter));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/productmovements");
    }
  };

  const paginateProductMovements = async (page: number) => {
    try {
      await dispatch(loadFilteredPage(page));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/productmovements");
    }
  };

  const dashboardProductMovements = async () => {
    try {
      const serverAnalyticsResponse: any = await repo.readAnalytics(tokenToUse);
      const serverCountResponse: any = await repo.readFilteredCount(
        tokenToUse,
        "productmovements/count",
        {}
      );
      await dispatch(loadAnalytics(serverAnalyticsResponse.results));
      await dispatch(loadUnfilteredCount(serverCountResponse.results[0]));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/dashboard");
    }
  };

  const showStockBySku = async (sku: string) => {
    try {
      const result = await repo.stockBySku(tokenToUse, sku);

      return result.results[0].stock;
    } catch (error) {
      console.error((error as Error).message);
      return 0;
    }
  };

  const addProductMovement = async (
    newProductMovement: Partial<ProductMovementStructure>
  ) => {
    try {
      await repo.addProductMovement(tokenToUse, newProductMovement);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const deleteProductMovement = async (id: string) => {
    try {
      await repo.deleteById(tokenToUse, id);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const stock = async () => {
    try {
      const serverStockResponse = await repo.stock(tokenToUse);
      await dispatch(loadStock(serverStockResponse));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/products");
    }
  };

  return {
    loadGallery,
    loadFilteredCount,
    loadFilteredPage,
    galleryProductMovement,
    filterProductMovements,
    paginateProductMovements,
    dashboardProductMovements,
    showStockBySku,
    addProductMovement,
    deleteProductMovement,
    stock,
  };
}
