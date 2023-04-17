import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  loadGallery,
  loadFilter,
  loadFilteredPage,
  loadFilteredCount,
  loadAnalytics,
  loadUnfilteredCount,
} from "../reducers/productmovement.slice";

import { initialState as initialUserState } from "../reducers/user.slice";

import { ProductMovementsRepo } from "../services/repositories/productmovement.repo";
import { useApp } from "./use.app";

export function useProductMovements(repo: ProductMovementsRepo) {
  const productMovementStateData = useSelector(
    (state: RootState) => state.productMovementState
  );
  const userStateData = useSelector((state: RootState) => state.userState);
  const dispatch = useDispatch<AppDispatch>();

  const tokenAtLocalStorage = localStorage.tokenERP;
  const tokenAtUserState = userStateData.userLoggedToken;

  const tokenToUse =
    tokenAtUserState === initialUserState.userLoggedToken
      ? tokenAtLocalStorage
      : tokenAtUserState;

  const { addError } = useApp();

  const galleryProductMovement = async () => {
    try {
      const serverGalleryResponse: any = await repo.readFilteredGallery(
        tokenToUse,
        "productmovements/gallery",
        productMovementStateData.filter
      );

      await dispatch(loadGallery(serverGalleryResponse.results));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/productmovements");
    }

    try {
      const serverCountResponse: any = await repo.readFilteredCount(
        tokenToUse,
        "productmovements/count",
        productMovementStateData.filter.filterField,
        productMovementStateData.filter.filterValue
      );

      await dispatch(loadFilteredCount(serverCountResponse.results[0]));
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

  const paginateProductMovements = (page: number) => {
    try {
      dispatch(loadFilteredPage(page));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/productmovements");
    }
  };

  const dashboardProductMovements = async () => {
    try {
      const serverAnalyticsResponse: any = await repo.readAnalytics(tokenToUse);
      await dispatch(loadAnalytics(serverAnalyticsResponse.results));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/dashboard");
    }

    try {
      const serverCountResponse: any = await repo.readFilteredCount(
        tokenToUse,
        "productmovements/count",
        "",
        ""
      );

      await dispatch(loadUnfilteredCount(serverCountResponse.results[0]));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, "/productmovements");
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
  };
}
