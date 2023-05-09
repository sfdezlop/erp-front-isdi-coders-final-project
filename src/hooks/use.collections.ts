import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  queryFields,
  queryInput,
  queryOutput,
} from "../reducers/collection.slice";
import { useApp } from "./use.app";
import { CollectionsRepo } from "../services/repositories/collection.repo";
import {
  AppCollectionField,
  GroupByQueryCollectionStructure,
  GroupBySetQueryCollectionStructure,
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";

export function useCollections(repo: CollectionsRepo) {
  const userState = useSelector((state: RootState) => state.userState);
  const appState = useSelector((state: RootState) => state.appState);
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );
  const dispatch = useDispatch<AppDispatch>();
  const tokenAtUserState = userState.userLoggedToken;
  const tokenToUse = tokenAtUserState;

  const { addError } = useApp();

  const updateQueryFields = async () => {
    try {
      const dataCollections = await repo.groupBySet(
        {
          filterCollection: "appcollectionfields",
          groupByField: "collectionName",
        },
        tokenToUse
      );

      const dataCollectionsResults = dataCollections.results;

      const dataFields = await repo.read(
        {
          filterCollection: "appcollectionfields",
          filterField: "",
          filterValue: "",
          searchField: "collectionName",
          searchValue: "",
          searchType: "Contains",
          querySet: 1,
          queryRecordsPerSet: 1000,
          orderField: "collectionName",
          orderType: "asc",
          primaryKey: "",
          primaryKeyValue: "",
        },
        tokenToUse
      );

      const dataFieldsResults: AppCollectionField[] = dataFields.results;

      const queryFieldsData = {
        collections: dataCollectionsResults,
        filterableFields: dataFieldsResults
          .filter((item) => item.filterable === true)
          .map((item) => item.collectionName + "_-_" + item.fieldName),
        searchableFields: dataFieldsResults
          .filter((item) => item.searchable === true)
          .map((item) => item.collectionName + "_-_" + item.fieldName),
        orderableFields: dataFieldsResults
          .filter((item) => item.orderable === true)
          .map((item) => item.collectionName + "_-_" + item.fieldName),
      };

      dispatch(queryFields(queryFieldsData));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };
  const updateQueryInput = async (
    queryInputFormObject: QueryInputCollectionStructure
  ) => {
    const groupByQueryForUnQueriedCount: GroupByQueryCollectionStructure = {
      filterCollection: queryInputFormObject.filterCollection,
      firstGroupByField: queryInputFormObject.filterField,
      secondGroupByField: queryInputFormObject.filterField,
      searchField: queryInputFormObject.filterField,
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
      const groupByQueryForQueriedCountServerRespond: {
        results: {
          _id: string;
          documents: number;
          aggregateSumValue: number;
        }[];
      } = await repo.groupBy(groupByQueryForQueriedCount, tokenToUse);

      const queriedCount = () => {
        let acc = 0;
        if (groupByQueryForQueriedCountServerRespond.results.length === 1)
          return groupByQueryForQueriedCountServerRespond.results[0].documents;

        const groupByFilteredServerRespondResults =
          groupByQueryForQueriedCountServerRespond.results.filter(
            (item) =>
              item._id.split("_-_")[0] === queryInputFormObject.filterValue
          );
        for (let i = 0; i < groupByFilteredServerRespondResults.length; i++) {
          acc = acc + groupByFilteredServerRespondResults[i].documents;
        }
        return acc;
      };

      const groupByQueryForUnQueriedCountServerRespond: {
        results: {
          _id: string;
          documents: number;
          aggregateSumValue: number;
        }[];
      } = await repo.groupBy(groupByQueryForUnQueriedCount, tokenToUse);
      const unQueriedCount = () => {
        let acc = 0;
        if (groupByQueryForUnQueriedCountServerRespond.results.length === 1)
          return groupByQueryForUnQueriedCountServerRespond.results[0]
            .documents;

        for (
          let i = 0;
          i < groupByQueryForUnQueriedCountServerRespond.results.length;
          i++
        ) {
          acc =
            acc +
            groupByQueryForUnQueriedCountServerRespond.results[i].documents;
        }
        return acc;
      };

      const filterValueOptionsShown: {
        results: string[];
      } = await repo.groupBySet(
        groupBySetQueryForFilterValueOptionsShown,
        tokenToUse
      );

      const queryOutputData: QueryOutputCollectionStructure = {
        filterValueOptionsShown: filterValueOptionsShown.results,
        pageShown: queryInputFormObject.querySet ?? 1,
        queriedCount: queriedCount(),
        unQueriedCount: unQueriedCount(),
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
    updateQueryFields,
    updateQueryInput,
    updateQueryOutput,
    queryInput,
    queryOutput,
  };
}
