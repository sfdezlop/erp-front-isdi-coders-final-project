import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./query.collection.css";
import { QueryInputCollectionStructure } from "../../../models/collections.model";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";
import { useCollections } from "../../../hooks/use.collections";
import { stringSeparator } from "../../../config";
import { recordsPerSet } from "../../../reducers/collection.slice";
import { useNavigate } from "react-router-dom";
import { queryInputOnChangeCollection } from "./query.collection.cases";

const componentFile = "query.collection.tsx";
//To control the file and line of code where Hook functions are called

export type QueryCollectionPropsStructure = {
  queryCollectionProps: string;
};

export const navigationURIToQueryPage = (
  queryInput: QueryInputCollectionStructure
) => {
  const result = encodeURI(
    "/collections/readrecords/&collection=" +
      queryInput.filterCollection +
      "&filterfield=" +
      queryInput.filterField +
      "&filtervalue=" +
      queryInput.filterValue +
      "&searchfield=" +
      queryInput.searchField +
      "&searchvalue=" +
      queryInput.searchValue +
      "&searchtype=" +
      queryInput.searchType +
      "&queryset=" +
      queryInput.querySet +
      "&queryrecordsperset=" +
      queryInput.queryRecordsPerSet +
      "&orderfield=" +
      queryInput.orderField +
      "&ordertype=" +
      queryInput.orderType +
      "&controlinfo="
  );
  return result;
};
export function QueryCollection({
  queryCollectionProps,
}: QueryCollectionPropsStructure) {
  const navigate = useNavigate();

  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const collectionFilterableFields =
    collectionState.queryFields.filterableFields
      .filter(
        (item) =>
          item.split(stringSeparator)[0] ===
          collectionState.queryInput.filterCollection
      )
      .sort()

      .map((item) => item.split(stringSeparator)[1]);
  const collectionSearchableFields =
    collectionState.queryFields.searchableFields
      .filter(
        (item) =>
          item.split(stringSeparator)[0] ===
          collectionState.queryInput.filterCollection
      )
      .sort()

      .map((item) => item.split(stringSeparator)[1]);

  const collectionOrderableFields = collectionState.queryFields.orderableFields
    .filter(
      (item) =>
        item.split(stringSeparator)[0] ===
        collectionState.queryInput.filterCollection
    )
    .sort()

    .map((item) => item.split(stringSeparator)[1]);

  const searchTypeOptions = [
    "Begins with",
    "Contains",
    "Ends with",
    "Exact match",
  ];

  const filterValueOptionsShown = [
    ...collectionState.queryOutput.filterValueOptionsShown,
  ];

  filterValueOptionsShown.push("(select all)");
  const filterValueOptionsShownWithSelectAllAndOrdered =
    filterValueOptionsShown.sort();

  const maximumPages =
    Math.floor(
      collectionState.queryOutput.queriedCount /
        collectionState.queryInput.queryRecordsPerSet
    ) ===
    collectionState.queryOutput.queriedCount /
      collectionState.queryInput.queryRecordsPerSet
      ? Math.floor(
          collectionState.queryOutput.queriedCount /
            collectionState.queryInput.queryRecordsPerSet
        )
      : Math.floor(
          collectionState.queryOutput.queriedCount /
            collectionState.queryInput.queryRecordsPerSet
        ) + 1;

  const maximumPagesToShow = maximumPages > 100 ? 100 : maximumPages;
  //To control the rendering speed of the component. Please note that a collection of 100k documents with the option of 4 documents per page would return 25k options of pages that need to be shown in the selector element. If the user want to access to all the documents in the collection, he/she needs to change the records per page selector

  const pagesArray: number[] = [1];
  for (let i = 2; i <= maximumPagesToShow; i++) {
    pagesArray.push(i);
  }

  const repoCollection = new CollectionsRepo();
  const {
    updateQueryFields,
    updateQueryInput,
    updateTranslations,
    updateAppCollectionFields,
  } = useCollections(repoCollection);

  const handlerOnChangeCollection = (
    event: SyntheticEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const selector = event.currentTarget;
    const filterCollection = (selector as HTMLSelectElement).value;

    const queryFormObject: QueryInputCollectionStructure =
      queryInputOnChangeCollection(filterCollection);
    updateQueryInput(
      queryFormObject,
      "componentFile_" + componentFile + "_line_133"
    );
    navigate(navigationURIToQueryPage(queryFormObject));
  };

  const handlerOnChangeFilterField = (
    event: SyntheticEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    const queryFormObject: QueryInputCollectionStructure =
      queryInputOnChangeCollection(collectionState.queryInput.filterCollection);

    const queryFormObjectTransformed = Object.assign(queryFormObject);
    queryFormObjectTransformed.filterValue = "";
    queryFormObjectTransformed.querySet = 1;

    console.table(queryFormObjectTransformed);

    updateQueryInput(
      queryFormObjectTransformed,
      "componentFile_" + componentFile + "_line_165"
    );

    navigate("/" + queryCollectionProps);
  };

  const handlerOnChangeForm = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryForm = event.currentTarget;

    const queryFormObject: QueryInputCollectionStructure = {
      filterCollection: (queryForm.elements[0] as HTMLFormElement).value,
      filterField: (queryForm.elements[1] as HTMLFormElement).value,
      filterValue:
        (queryForm.elements[2] as HTMLFormElement).value === "(select all)"
          ? ""
          : (queryForm.elements[2] as HTMLFormElement).value.toString(),

      // As agreed with the backend, the '(select all)' values for filters should be requested as ''
      searchField: (queryForm.elements[3] as HTMLFormElement).value,
      searchType: (queryForm.elements[4] as HTMLFormElement).value,
      searchValue: (queryForm.elements[5] as HTMLFormElement).value.toString(),

      orderField: (queryForm.elements[6] as HTMLFormElement).value,
      orderType: (queryForm.elements[7] as HTMLFormElement).value,
      queryRecordsPerSet: (queryForm.elements[8] as HTMLFormElement).value,
      querySet: (queryForm.elements[9] as HTMLFormElement).value,
      primaryKey: "",
      primaryKeyValue: "",
    };
    updateQueryInput(
      queryFormObject,
      "componentFile_" + componentFile + "_line_156"
    );
  };

  useEffect(() => {
    const presentForm = (document.querySelector("form") as HTMLFormElement) ?? (
      <form>
        <select>defensive code</select>
      </form>
    );

    const decodedQueryCollectionProps = decodeURI(queryCollectionProps);
    (presentForm.elements[0] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&collection=")[1]
        .split("&filterfield=")[0];
    (presentForm.elements[1] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&filterfield=")[1]
        .split("&filtervalue=")[0];
    (presentForm.elements[2] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&filtervalue=")[1]
        .split("&searchfield=")[0] === ""
        ? "(select all)"
        : decodedQueryCollectionProps
            .split("filtervalue=")[1]
            .split("&searchfield=")[0];
    (presentForm.elements[3] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&searchfield=")[1]
        .split("&searchvalue=")[0];
    (presentForm.elements[4] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&searchtype=")[1]
        .split("&queryset=")[0];
    (presentForm.elements[5] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&searchvalue=")[1]
        .split("&searchtype=")[0];
    (presentForm.elements[6] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&orderfield=")[1]
        .split("&ordertype=")[0];
    (presentForm.elements[7] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&ordertype=")[1]
        .split("&controlinfo=")[0];
    (presentForm.elements[8] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&queryrecordsperset=")[1]
        .split("&orderfield=")[0];
    (presentForm.elements[9] as HTMLFormElement).value =
      decodedQueryCollectionProps
        .split("&queryset=")[1]
        .split("&queryrecordsperset=")[0];
    navigate("/" + queryCollectionProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="queryCollection__container">
        <div className="queryCollection__formContainer">
          <form
            className="queryCollection__formContainer"
            onChange={handlerOnChangeForm}
            // onKeyUp={handlerOnEvent}
          >
            <label className="queryCollection__label">
              {"Collection to query"}
              <select
                name="collection"
                id="formElement0"
                onChange={handlerOnChangeCollection}
              >
                {collectionState.queryInput.filterCollection}
                {collectionState.queryFields.collections.map((item) => (
                  <option
                    key={item}
                    selected={
                      item === collectionState.queryInput.filterCollection
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>

              <div>{collectionState.queryInput.filterCollection}</div>
            </label>
            <label className="queryCollection__label">
              {"Filter field"}
              <select name="filter_field" onChange={handlerOnChangeFilterField}>
                {collectionState.queryInput.filterField}
                {collectionFilterableFields.map((item) => (
                  <option
                    key={"filter_" + item}
                    selected={
                      item === collectionState.queryInput.filterField
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>

              <div>{collectionState.queryInput.filterField}</div>
            </label>
            <label className="queryCollection__label">
              {"Filter value"}
              <select name="filter_value" onChange={() => {}}>
                {collectionState.queryInput.filterValue}
                {filterValueOptionsShownWithSelectAllAndOrdered.map(
                  (item: string) => (
                    <option
                      key={item}
                      selected={
                        item === collectionState.queryInput.filterValue
                          ? true
                          : false
                      }
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <div>{collectionState.queryInput.filterValue}</div>
            </label>
            <label className="queryCollection__label">
              {"Search field"}
              <select name="search_field" onChange={() => {}}>
                {collectionState.queryInput.searchField}
                {collectionSearchableFields.map((item) => (
                  <option
                    key={"search_" + item}
                    selected={
                      item === collectionState.queryInput.searchField
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>

              <div>{collectionState.queryInput.searchField}</div>
            </label>
            <label className="queryCollection__label">
              {"Search type"}
              <select name="search_type" onChange={() => {}}>
                {collectionState.queryInput.searchType}
                {searchTypeOptions.map((item) => (
                  <option
                    key={"searchType_" + item}
                    selected={
                      item === collectionState.queryInput.searchType
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>

              <div>{collectionState.queryInput.searchType}</div>
            </label>
            <label className="queryCollection__label">
              {"Search value (case sens.)"}
              <input
                name="search_value"
                value={collectionState.queryInput.searchValue}
                onChange={() => {}}
              ></input>

              <div>{collectionState.queryInput.searchValue.toString()}</div>
            </label>

            <label className="queryCollection__label">
              {"Order by"}
              <select name="order_field" onChange={() => {}}>
                {collectionState.queryInput.orderField}
                {collectionOrderableFields.map((item) => (
                  <option
                    key={"order_" + item}
                    selected={
                      item === collectionState.queryInput.orderField
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>

              <div>{collectionState.queryInput.orderField}</div>
            </label>
            <label className="queryCollection__label">
              {"Order type"}
              <select name="order_type" onChange={() => {}}>
                {collectionState.queryInput.orderType}

                <option
                  key={"asc"}
                  selected={collectionState.queryInput.orderType === "asc"}
                >
                  {"asc"}
                </option>
                <option
                  key={"desc"}
                  selected={collectionState.queryInput.orderType === "desc"}
                >
                  {"desc"}
                </option>
              </select>

              <div>{collectionState.queryInput.orderType}</div>
            </label>
            <label className="queryCollection__label">
              {"Docs/page"}
              <select name="queryrecordsperset" onChange={() => {}}>
                {collectionState.queryInput.queryRecordsPerSet}
                {recordsPerSet.map((item) => (
                  <option
                    key={item}
                    selected={
                      item === collectionState.queryInput.queryRecordsPerSet
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>

              <div>{collectionState.queryInput.queryRecordsPerSet}</div>
            </label>
            <label className="queryCollection__label">
              {"Go to Page# "}
              <select name="pageshown" onChange={() => {}}>
                {pagesArray.map((item) => (
                  <option
                    key={item}
                    selected={
                      item === collectionState.queryOutput.pageShown
                        ? true
                        : false
                    }
                  >
                    {item}
                  </option>
                ))}
              </select>

              <div>{collectionState.queryOutput.pageShown}</div>
            </label>
          </form>
        </div>
        <div>
          <div className="queryCollection__paginationContainer">
            <div>
              {"# documents at collection: " +
                collectionState.queryOutput.unQueriedCount}
            </div>
            <div>
              {"# documents at query: " +
                collectionState.queryOutput.queriedCount}
            </div>
            <div>{"# available pages: " + maximumPages}</div>
            <div>
              {"# page shown: " + collectionState.queryOutput.pageShown}
            </div>
            <div>{"Props: " + queryCollectionProps}</div>
          </div>
        </div>
      </div>
    </>
  );
}
