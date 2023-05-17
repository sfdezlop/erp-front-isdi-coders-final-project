import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  queryFields,
  queryInput,
  queryOutput,
  translations,
  appCollectionFields,
} from "../reducers/collection.slice";
import { useApp } from "./use.app";
import { CollectionsRepo } from "../services/repositories/collection.repo";
import {
  AppCollectionFieldStructure,
  GroupByQueryCollectionStructure,
  GroupBySetQueryCollectionStructure,
  QueryInputCollectionStructure,
  QueryOutputCollectionStructure,
} from "../models/collections.model";
import { stringSeparator } from "../config";

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

  const updateQueryFields = async (controlInfo: string) => {
    try {
      const dataCollections = await repo.groupBySet(
        {
          filterCollection: "appcollectionfields",
          groupByField: "collectionName",
        },
        tokenToUse,
        controlInfo
      );

      const dataCollectionsResults = dataCollections.results;

      const dataFields = await repo.readRecords(
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
        tokenToUse,
        controlInfo
      );

      const dataFieldsResults: AppCollectionFieldStructure[] =
        dataFields.results;

      const queryFieldsData = {
        collections: dataCollectionsResults,
        filterableFields: dataFieldsResults
          .filter((item) => item.filterable === true)
          .map(
            (item) => item.collectionName + stringSeparator + item.fieldName
          ),
        searchableFields: dataFieldsResults
          .filter((item) => item.searchable === true)
          .map(
            (item) => item.collectionName + stringSeparator + item.fieldName
          ),
        orderableFields: dataFieldsResults
          .filter((item) => item.orderable === true)
          .map(
            (item) => item.collectionName + stringSeparator + item.fieldName
          ),
      };

      dispatch(queryFields(queryFieldsData));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };
  const updateQueryInput = async (
    queryInputData: QueryInputCollectionStructure,
    controlInfo: string
  ) => {
    const groupByQueryForUnQueriedCount: GroupByQueryCollectionStructure = {
      filterCollection: queryInputData.filterCollection,
      firstGroupByField: queryInputData.filterField,
      secondGroupByField: queryInputData.filterField,
      searchField: queryInputData.filterField,
      searchValue: "",
      searchType: "Contains",
      aggregateSumField: "addedFieldForCountingDocuments",
    };

    const groupByQueryForQueriedCount: GroupByQueryCollectionStructure = {
      filterCollection: queryInputData.filterCollection,
      firstGroupByField: queryInputData.filterField,
      secondGroupByField: queryInputData.filterField,
      searchField: queryInputData.searchField,
      searchValue: queryInputData.searchValue,
      searchType: queryInputData.searchType,
      aggregateSumField: "addedFieldForCountingDocuments",
    };

    const groupBySetQueryForFilterValueOptionsShown: GroupBySetQueryCollectionStructure =
      {
        filterCollection: queryInputData.filterCollection,
        groupByField: queryInputData.filterField,
      };

    try {
      const gallery = await repo.readRecords(
        queryInputData,
        tokenToUse,
        controlInfo
      );
      const groupByQueryForQueriedCountServerRespond: {
        results: {
          _id: string;
          documents: number;
          aggregateSumValue: number;
        }[];
      } = await repo.groupBy(
        groupByQueryForQueriedCount,
        tokenToUse,
        controlInfo
      );

      const queriedCount = () => {
        let acc = 0;
        if (groupByQueryForQueriedCountServerRespond.results.length === 1)
          return groupByQueryForQueriedCountServerRespond.results[0].documents;

        const groupByFilteredServerRespondResults =
          groupByQueryForQueriedCountServerRespond.results.filter((item) =>
            queryInputData.filterValue === ""
              ? item
              : item._id.split(stringSeparator)[0] ===
                queryInputData.filterValue
          );

        groupByFilteredServerRespondResults.forEach(
          (item) => (acc = acc + item.documents)
        );
        return acc;
      };

      const groupByQueryForUnQueriedCountServerRespond: {
        results: {
          _id: string;
          documents: number;
          aggregateSumValue: number;
        }[];
      } = await repo.groupBy(
        groupByQueryForUnQueriedCount,
        tokenToUse,
        controlInfo
      );
      const unQueriedCount = () => {
        let acc = 0;
        if (groupByQueryForUnQueriedCountServerRespond.results.length === 1)
          return groupByQueryForUnQueriedCountServerRespond.results[0]
            .documents;

        groupByQueryForUnQueriedCountServerRespond.results.forEach(
          (element) => {
            acc = acc + element.documents;
          }
        );

        return acc;
      };

      const filterValueOptionsShown: {
        results: string[];
      } = await repo.groupBySet(
        groupBySetQueryForFilterValueOptionsShown,
        tokenToUse,
        controlInfo
      );

      const queryOutputData: QueryOutputCollectionStructure = {
        filterValueOptionsShown: filterValueOptionsShown.results,
        pageShown: queryInputData.querySet ?? 1,
        queriedCount: queriedCount(),
        unQueriedCount: unQueriedCount(),
        gallery: gallery.results,
        galleryInterface: "raw",
        detail: [],
        detailInterface: "raw",
      };

      dispatch(queryInput(queryInputData));
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

  const updateTranslations = async (controlInfo: string) => {
    try {
      const dataCollections = await repo.readRecords(
        {
          filterCollection: "translations",
          filterField: "inputText",
          filterValue: "",
          searchField: "inputText",
          searchValue: "",
          searchType: "Contains",
          querySet: 1,
          queryRecordsPerSet: 1000,
          orderField: "inputText",
          orderType: "asc",
          primaryKey: "",
          primaryKeyValue: "",
        },
        tokenToUse,
        controlInfo
      );

      const dataCollectionsResults = dataCollections.results;

      dispatch(translations(dataCollectionsResults));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };

  const updateAppCollectionFields = async (controlInfo: string) => {
    try {
      const dataCollections = await repo.readRecords(
        {
          filterCollection: "appcollectionfields",
          filterField: "collectionName",
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
        tokenToUse,
        controlInfo
      );

      const dataCollectionsResults = dataCollections.results;

      dispatch(appCollectionFields(dataCollectionsResults));
    } catch (error) {
      console.error((error as Error).message);
      addError(error as Error, appState.urlPage);
    }
  };

  const translate = (originalText: string): string => {
    const translations = collectionState.translations;

    const userLanguage = userState.userLogged.language ?? "es";

    const translationsFilteredByInputText = translations.filter(
      (element) => element.inputText === originalText
    );

    if (translationsFilteredByInputText.length === 0) return originalText;

    return translationsFilteredByInputText[0].outputTexts.filter(
      (element) => element.isoCode === userLanguage
    )[0].outputText;
  };

  return {
    updateQueryFields,
    updateQueryInput,
    updateQueryOutput,
    updateTranslations,
    translate,
    updateAppCollectionFields,

    queryInput,
    queryOutput,
    translations,
    appCollectionFields,
  };
}
