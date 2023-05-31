import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "./query.collection.css";
import { QueryInputCollectionStructure } from "../../../models/collections.model";
import { CollectionsRepo } from "../../../services/repositories/collection.repo";
import { useCollections } from "../../../hooks/use.collections";
import { stringSeparator } from "../../../config";
import { recordsPerSet } from "../../../reducers/collection.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { queryInputOnChangeCollection } from "./query.collection.cases";
import { navigationURIToQueryPage } from "../../../services/helpers/functions";

const componentFile = "query.collection.tsx";
//To control the file and line of code where Hook functions are called

export type QueryCollectionPropsStructure = {
  queryCollectionProps: string;
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
  const { updateQueryInput } = useCollections(repoCollection);

  const handlerOnChangeCollection = (
    event: SyntheticEvent<HTMLSelectElement>
  ) => {
    const selector = event.currentTarget;
    const filterCollection = (selector as HTMLSelectElement).value;

    const queryDefault: QueryInputCollectionStructure =
      queryInputOnChangeCollection(filterCollection);
    updateQueryInput(
      queryDefault,
      "componentFile_" + componentFile + "_line_138"
    );
    console.log("queryDefault", queryDefault);
    navigate(navigationURIToQueryPage(queryDefault));
    console.log(navigationURIToQueryPage(queryDefault));
  };

  const handlerOnChangeFilterField = (
    event: SyntheticEvent<HTMLSelectElement>
  ) => {
    const selector = event.currentTarget;
    const filterField = (selector as HTMLSelectElement).value;

    const queryDefault: QueryInputCollectionStructure =
      queryInputOnChangeCollection(collectionState.queryInput.filterCollection);

    const queryDefaultModified = Object.assign(queryDefault);
    queryDefaultModified.filterField = filterField;
    queryDefaultModified.filterValue = "";
    queryDefaultModified.searchValue = "";
    queryDefaultModified.querySet = 1;

    updateQueryInput(
      queryDefaultModified,
      "componentFile_" + componentFile + "_line_165"
    );
    navigate(navigationURIToQueryPage(queryDefaultModified));
  };

  const handlerOnChangeFilterValue = (
    event: SyntheticEvent<HTMLSelectElement>
  ) => {
    const selector = event.currentTarget;
    const filterValue = (selector as HTMLSelectElement).value;

    //The following code does not work, throwing an error of "Uncaught TypeError: Cannot assign to read only property 'filterValue' of object '#<Object>'" even if it works the same code logic at handlerOnChangeFilterField
    // const queryDefault = Object.assign(collectionState.queryInput);
    // const queryDefaultModified = Object.assign(queryDefault);
    // queryDefaultModified.filterValue = filterValue.toString();
    // queryDefaultModified.querySet = 1;

    const queryDefaultModified = {
      filterCollection: collectionState.queryInput.filterCollection,
      filterField: collectionState.queryInput.filterField,
      filterValue:
        filterValue.toString() === "(select all)" ? "" : filterValue.toString(),
      searchField: collectionState.queryInput.searchField,
      searchValue: "",
      searchType:
        collectionState.queryInput.searchType === "Exact match"
          ? "Contains"
          : collectionState.queryInput.searchType,
      querySet: 1,
      queryRecordsPerSet: collectionState.queryInput.queryRecordsPerSet,
      orderField: collectionState.queryInput.orderField,
      orderType: collectionState.queryInput.orderType,
      showType: collectionState.queryInput.showType,
      showFormat: collectionState.queryInput.showFormat,
    };

    updateQueryInput(
      queryDefaultModified,
      "componentFile_" + componentFile + "_line_195"
    );
    navigate(navigationURIToQueryPage(queryDefaultModified));
  };

  const handlerOnChangeForm = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryForm = event.currentTarget;

    const queryFormObject: QueryInputCollectionStructure = {
      filterCollection: collectionState.queryInput.filterCollection,
      filterField: collectionState.queryInput.filterField,
      filterValue: collectionState.queryInput.filterValue,
      searchField: (queryForm.elements[0] as HTMLFormElement).value,
      searchType: (queryForm.elements[1] as HTMLFormElement).value,
      searchValue: (queryForm.elements[2] as HTMLFormElement).value.toString(),
      orderField: (queryForm.elements[3] as HTMLFormElement).value,
      orderType: (queryForm.elements[4] as HTMLFormElement).value,
      queryRecordsPerSet: (queryForm.elements[5] as HTMLFormElement).value,
      querySet: 1,
      showType: collectionState.queryInput.showType,
      showFormat: collectionState.queryInput.showFormat,
    };
    updateQueryInput(
      queryFormObject,
      "componentFile_" + componentFile + "_line_210"
    );
    navigate(navigationURIToQueryPage(queryFormObject));
  };

  const handlerOnChangePage = (event: SyntheticEvent<HTMLSelectElement>) => {
    const selector = event.currentTarget;

    const queryObject: QueryInputCollectionStructure = {
      filterCollection: collectionState.queryInput.filterCollection,
      filterField: collectionState.queryInput.filterField,
      filterValue: collectionState.queryInput.filterValue,
      searchField: collectionState.queryInput.searchField,
      searchType: collectionState.queryInput.searchType,
      searchValue: collectionState.queryInput.searchValue,
      orderField: collectionState.queryInput.orderField,
      orderType: collectionState.queryInput.orderType,
      queryRecordsPerSet: collectionState.queryInput.queryRecordsPerSet,
      querySet: Number(selector.value),
      showType: collectionState.queryInput.showType,
      showFormat: collectionState.queryInput.showFormat,
    };
    updateQueryInput(
      queryObject,
      "componentFile_" + componentFile + "_line_235"
    );
    navigate(navigationURIToQueryPage(queryObject));
  };

  const handlerOnChangeShowType = (
    event: SyntheticEvent<HTMLSelectElement>
  ) => {
    const selector = event.currentTarget;

    const queryObject: QueryInputCollectionStructure = {
      filterCollection: collectionState.queryInput.filterCollection,
      filterField: collectionState.queryInput.filterField,
      filterValue: collectionState.queryInput.filterValue,
      searchField: collectionState.queryInput.searchField,
      searchType: collectionState.queryInput.searchType,
      searchValue: collectionState.queryInput.searchValue,
      orderField: collectionState.queryInput.orderField,
      orderType: collectionState.queryInput.orderType,
      queryRecordsPerSet: collectionState.queryInput.queryRecordsPerSet,
      querySet: collectionState.queryInput.querySet,
      showType: selector.value,
      showFormat: collectionState.queryInput.showFormat,
    };
    updateQueryInput(
      queryObject,
      "componentFile_" + componentFile + "_line_235"
    );
    navigate(navigationURIToQueryPage(queryObject));
  };

  return (
    <>
      <div className="queryCollection__container">
        <div className="queryCollection__queryContainer">
          <label className="queryCollection__label">
            <div>{"Collection to query"}</div>
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
            <div>{"Filter field"}</div>
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
            <div>{"Filter value"}</div>
            <select name="filter_value" onChange={handlerOnChangeFilterValue}>
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
          <form
            className="queryCollection__formContainer"
            onChange={handlerOnChangeForm}
          >
            <label className="queryCollection__label">
              <div>{"Search field"}</div>
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
              <div>{"Search type"}</div>
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
              <div>{"Search value (case sens.)"}</div>
              <input
                name="search_value"
                value={collectionState.queryInput.searchValue}
                onChange={() => {}}
              ></input>

              <div>{collectionState.queryInput.searchValue.toString()}</div>
            </label>

            <label className="queryCollection__label">
              <div>{"Order by"}</div>
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
              <div>{"Order type"}</div>
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
              <div>{"Docs/page"}</div>
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
          </form>
          <label className="queryCollection__label">
            <div>{"Goto Page"}</div>
            <select onChange={handlerOnChangePage}>
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
          <label className="queryCollection__label">
            <div>{"Show type"}</div>
            <select name="show_type" onChange={handlerOnChangeShowType}>
              {collectionState.queryInput.showType}

              <option
                key={"gallery"}
                selected={collectionState.queryInput.showType === "gallery"}
              >
                {"gallery"}
              </option>
              <option
                key={"detail"}
                selected={collectionState.queryInput.showType === "detail"}
              >
                {"detail"}
              </option>
            </select>

            <div>{collectionState.queryInput.showType}</div>
          </label>
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
            <div>{"props===pathname:"}</div>
            <div>
              {decodeURI(useLocation().pathname) === queryCollectionProps
                ? "true"
                : "false"}
            </div>
            {/* <div>{decodeURI(useLocation().pathname.toString())}</div>
            <div>{queryCollectionProps}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
