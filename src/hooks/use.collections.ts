import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { queryInput, queryOutput } from "../reducers/collection.slice";
import { useApp } from "./use.app";
import { CollectionsRepo } from "../services/repositories/collection.repo";
import {
  GroupByQueryCollectionStructure,
  GroupBySetQueryCollectionStructure,
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";

export function useCollections(repo: CollectionsRepo) {
  const userState = useSelector((state: RootState) => state.userState);
  const appState = useSelector((state: RootState) => state.appState);
  const dispatch = useDispatch<AppDispatch>();
  const tokenAtUserState = userState.userLoggedToken;
  const tokenToUse = tokenAtUserState;

  const { addError } = useApp();

  const updateQueryInput = async (
    queryInputFormObject: QueryInputCollectionStructure
  ) => {
    const groupByQueryForUnQueriedCount: GroupByQueryCollectionStructure = {
      filterCollection: queryInputFormObject.filterCollection,
      firstGroupByField: queryInputFormObject.filterField,
      secondGroupByField: queryInputFormObject.filterField,
      searchField: "brand",
      searchValue: "",
      searchType: "Contains",
      aggregateSumField: "addedFieldForCountingDocuments",
    };

    const groupByQueryForQueriedCount: GroupByQueryCollectionStructure = {
      filterCollection: queryInputFormObject.filterCollection,
      firstGroupByField: queryInputFormObject.filterField,
      secondGroupByField: queryInputFormObject.filterField,
      searchField: queryInputFormObject.searchField,
      searchValue: queryInputFormObject.searchValue,
      searchType: queryInputFormObject.searchType,
      aggregateSumField: "addedFieldForCountingDocuments",
    };

    const groupBySetQueryForFilterValueOptionsShown: GroupBySetQueryCollectionStructure =
      {
        filterCollection: queryInputFormObject.filterCollection,
        groupByField: queryInputFormObject.filterField,
      };

    try {
      const gallery = await repo.read(queryInputFormObject, tokenToUse);
      const unQueriedCount: {
        results: { documents: number; aggregateSumValue: number }[];
      } = await repo.groupBy(groupByQueryForUnQueriedCount, tokenToUse);

      const queriedCount: {
        results: { documents: number; aggregateSumValue: number }[];
      } = await repo.groupBy(groupByQueryForQueriedCount, tokenToUse);

      const filterValueOptionsShown: {
        results: string[];
      } = await repo.groupBySet(
        groupBySetQueryForFilterValueOptionsShown,
        tokenToUse
      );

      const queryOutputData: QueryOutputCollectionStructure = {
        filterValueOptionsShown: filterValueOptionsShown.results,
        pageShown: queryInputFormObject.querySet ?? 1,
        queriedCount: queriedCount.results[0].documents,
        unQueriedCount: unQueriedCount.results[0].documents,
        gallery: gallery.results,
        detail: [],
      };
      dispatch(queryInput(queryInputFormObject));
      dispatch(queryOutput(queryOutputData));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };

  const updateQueryOutput = (
    queryOutputData: QueryOutputCollectionStructure
  ) => {
    dispatch(queryOutput(queryOutputData));
  };

  return {
    updateQueryInput,
    updateQueryOutput,
    queryInput,
    queryOutput,
  };
}
