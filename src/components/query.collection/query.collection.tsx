import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import "./query.collection.css";
import { QueryInputCollectionStructure } from "../../models/collections.model";
import { CollectionsRepo } from "../../services/repositories/collection.repo";
import { useCollections } from "../../hooks/use.collections";
import React from "react";

const componentFile = "query.collection.tsx";
//To control the file and line of code where Hook functions are called

export type QueryCollectionProps = {
  collectionName: string;
};
export const recordsPerSet = [4, 8, 16, 32, 64, 128, 256];
export function QueryCollection({ collectionName }: QueryCollectionProps) {
  const formElements = useRef({
    filterCollection: "products",
    filterField: "brand",
    filterValue: "",
    searchField: "sku",
    searchValue: "",
    searchType: "Contains",
    querySet: 1,
    queryRecordsPerSet: recordsPerSet[0],
    orderField: "ean",
    orderType: "asc",
    primaryKey: "",
    primaryKeyValue: "",
  });
  const changeCollectionQueryInput = useRef({
    filterCollection: "products",
    filterField: "brand",
    filterValue: "",
    searchField: "sku",
    searchValue: "",
    searchType: "Contains",
    querySet: 1,
    queryRecordsPerSet: recordsPerSet[0],
    orderField: "ean",
    orderType: "asc",
    primaryKey: "",
    primaryKeyValue: "",
  });

  const changeFilterFieldQueryInput = useRef({
    filterCollection: "products",
    filterField: "brand",
    filterValue: "",
    searchField: "sku",
    searchValue: "",
    searchType: "Contains",
    querySet: 1,
    queryRecordsPerSet: recordsPerSet[0],
    orderField: "ean",
    orderType: "asc",
    primaryKey: "",
    primaryKeyValue: "",
  });

  // const [localChangeCollection, setLocalChangeCollection] = useState(false);
  const booleanChangeCollectionQueryInput = useRef(false);
  const booleanChangeFilterFieldQueryInput = useRef(false);
  const renderNumber = useRef(1);

  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const [localFilterCollection, setLocalFilterCollection] = useState(
    collectionState.queryInput.filterCollection
  );
  const [localFilterField, setLocalFilterField] = useState(
    collectionState.queryInput.filterField
  );
  const [localFilterValue, setLocalFilterValue] = useState(
    collectionState.queryInput.filterValue
  );

  const [localSearchField, setLocalSearchField] = useState(
    collectionState.queryInput.searchField
  );

  const [localSearchType, setLocalSearchType] = useState(
    collectionState.queryInput.searchType
  );

  const [localSearchValue, setLocalSearchValue] = useState(
    collectionState.queryInput.searchValue
  );

  const [localOrderField, setLocalOrderField] = useState(
    collectionState.queryInput.orderField
  );

  const [localOrderType, setLocalOrderType] = useState(
    collectionState.queryInput.orderType
  );

  const [localRecordsPerSet, setLocalRecordsPerSet] = useState(
    collectionState.queryInput.queryRecordsPerSet
  );

  const [localPageShown, setLocalPageShown] = useState(
    collectionState.queryOutput.pageShown
  );

  function queryInputDefault(collection: string) {
    let queryInputDefaultObject;
    switch (collection) {
      case "products":
        return (queryInputDefaultObject = {
          filterCollection: "products",
          filterField: "brand",
          filterValue: "",
          searchField: "sku",
          searchValue: "",
          searchType: "Contains",
          querySet: 1,
          queryRecordsPerSet: recordsPerSet[0],
          orderField: "ean",
          orderType: "asc",
          primaryKey: "",
          primaryKeyValue: "",
        });

      case "productmovements":
        return (queryInputDefaultObject = {
          filterCollection: "productmovements",
          filterField: "type",
          filterValue: "",
          searchField: "batch",
          searchValue: "",
          searchType: "Contains",
          querySet: 1,
          queryRecordsPerSet: recordsPerSet[1],
          orderField: "date",
          orderType: "desc",
          primaryKey: "",
          primaryKeyValue: "",
        });

      default:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (queryInputDefaultObject = {
          filterCollection: "products",
          filterField: "brand",
          filterValue: "",
          searchField: "sku",
          searchValue: "",
          searchType: "Contains",
          querySet: 1,
          queryRecordsPerSet: recordsPerSet[0],
          orderField: "ean",
          orderType: "asc",
          primaryKey: "",
          primaryKeyValue: "",
        });
    }
  }

  const collections = collectionState.queryFields.collections;
  const collectionFilterableFields =
    collectionState.queryFields.filterableFields
      .filter((item) => item.split("_-_")[0] === localFilterCollection)
      .sort()

      .map((item) => item.split("_-_")[1]);
  const collectionSearchableFields =
    collectionState.queryFields.searchableFields
      .filter((item) => item.split("_-_")[0] === localFilterCollection)
      .sort()

      .map((item) => item.split("_-_")[1]);

  const collectionOrderableFields = collectionState.queryFields.orderableFields
    .filter((item) => item.split("_-_")[0] === localFilterCollection)
    .sort()

    .map((item) => item.split("_-_")[1]);

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
      collectionState.queryOutput.queriedCount / localRecordsPerSet
    ) ===
    collectionState.queryOutput.queriedCount / localRecordsPerSet
      ? Math.floor(
          collectionState.queryOutput.queriedCount / localRecordsPerSet
        )
      : Math.floor(
          collectionState.queryOutput.queriedCount / localRecordsPerSet
        ) + 1;

  const pagesArray: number[] = [1];
  for (let i = 2; i <= maximumPages; i++) {
    pagesArray.push(i);
  }

  const repoCollection = new CollectionsRepo();
  const { updateQueryFields, updateQueryInput } =
    useCollections(repoCollection);
  const handlerOnChange = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryForm = event.currentTarget;

    const queryInputFormObject: QueryInputCollectionStructure = {
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

    // formElements.current = queryInputFormObject;

    const copyOfChangeCollectionQueryInput = Object.assign(
      changeCollectionQueryInput
    );

    const copyOfChangeFilterFieldQueryInput = Object.assign(
      changeFilterFieldQueryInput
    );

    // console.table(copyOfChangeCollectionQueryInput.current);
    // console.table(queryInputFormObject);

    booleanChangeCollectionQueryInput.current
      ? updateQueryInput(
          copyOfChangeCollectionQueryInput.current,
          "componentFile_" + componentFile + "_line_223"
        )
      : updateQueryInput(
          queryInputFormObject,
          "componentFile_" + componentFile + "_line_227"
        );

    // setLocalChangeCollection(false);
    booleanChangeCollectionQueryInput.current = false;

    booleanChangeFilterFieldQueryInput.current
      ? updateQueryInput(
          copyOfChangeFilterFieldQueryInput.current,
          "componentFile_" + componentFile + "_line_223"
        )
      : updateQueryInput(
          queryInputFormObject,
          "componentFile_" + componentFile + "_line_227"
        );
    booleanChangeFilterFieldQueryInput.current = false;
  };

  const handlerOnEvent = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryForm = event.currentTarget;

    const queryInputEventFormObject: QueryInputCollectionStructure = {
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

    formElements.current = queryInputEventFormObject;
    updateQueryInput(
      formElements.current,
      "componentFile_" + componentFile + "_line_306"
    );
  };

  useEffect(() => {
    if (renderNumber.current === 1) {
      updateQueryFields("componentFile_" + componentFile + "_line_238");
      console.log("useEffect at query.collection.tsx");
      console.log("renderNumber=", renderNumber.current);
      console.log("updateQueryFields aplicado");
    } else {
      console.log("useEffect at query.collection.tsx");
      console.log("renderNumber=", renderNumber.current);
      console.log("updateQueryFields no aplicado");
    }
    renderNumber.current = renderNumber.current + 1;
    const presentForm = (document.querySelector("form") as HTMLFormElement) ?? (
      <form>
        <select>123</select>
      </form>
    );

    const queryInputShown = {
      filterCollection: (presentForm.elements[0] as HTMLFormElement).value,
      filterField: (presentForm.elements[1] as HTMLFormElement).value,
      filterValue:
        (presentForm.elements[2] as HTMLFormElement).value === "(select all)"
          ? ""
          : (presentForm.elements[2] as HTMLFormElement).value.toString(),

      // As agreed with the backend, the '(select all)' values for filters should be requested as ''
      searchField: (presentForm.elements[3] as HTMLFormElement).value,
      searchType: (presentForm.elements[4] as HTMLFormElement).value,
      searchValue: (
        presentForm.elements[5] as HTMLFormElement
      ).value.toString(),

      orderField: (presentForm.elements[6] as HTMLFormElement).value,
      orderType: (presentForm.elements[7] as HTMLFormElement).value,
      queryRecordsPerSet: (presentForm.elements[8] as HTMLFormElement).value,
      querySet: (presentForm.elements[9] as HTMLFormElement).value,
      primaryKey: "",
      primaryKeyValue: "",
    };
    const copyOfChangeCollectionQueryInput = Object.assign(
      changeCollectionQueryInput
    );
    console.log(
      "booleanChangeCollectionQueryInput: ",
      booleanChangeCollectionQueryInput.current
    );
    booleanChangeCollectionQueryInput.current
      ? updateQueryInput(
          copyOfChangeCollectionQueryInput.current,
          "componentFile_" + componentFile + "_line_282"
        )
      : updateQueryInput(
          queryInputShown,
          "componentFile_" + componentFile + "_line_286"
        );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="queryCollection__container">
        <div className="queryCollection__formContainer">
          <label className="queryCollection__label queryCollection__titles">
            {"Parameter "}
            <select defaultValue={"Shown"}>
              <option key={"Shown"}>{"Shown"}</option>
            </select>
            <div>{"OnClick Value"}</div>
            <div>{"Local State"}</div>
            <div>{"Global State"}</div>
          </label>
          <form
            className="queryCollection__formContainer"
            onChange={handlerOnEvent}
            onClick={handlerOnEvent}
            onKeyUp={handlerOnEvent}
          >
            {/* <form> */}
            <label className="queryCollection__label">
              {"Collection to query "}
              <select
                name="collection"
                id="formElement0"
                onChange={() => {
                  // setLocalChangeCollection(true);
                  booleanChangeCollectionQueryInput.current = true;
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  // console.log(localChangeCollection);
                  console.log(booleanChangeCollectionQueryInput.current);
                  changeCollectionQueryInput.current = queryInputDefault(
                    (presentForm.elements[0] as HTMLFormElement).value
                  );

                  setLocalFilterCollection(
                    (presentForm.elements[0] as HTMLFormElement).value
                  );
                  setLocalFilterField(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).filterField
                  );
                  setLocalFilterValue(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).filterValue
                  );
                  setLocalSearchField(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).searchField
                  );
                  setLocalSearchType(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).searchType
                  );

                  setLocalSearchValue(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).searchValue
                  );
                  setLocalOrderField(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).orderField
                  );
                  setLocalOrderType(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).orderType
                  );
                  setLocalRecordsPerSet(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).queryRecordsPerSet
                  );
                  setLocalPageShown(1);
                  updateQueryFields(
                    "componentFile_" + componentFile + "_line_376"
                  );
                }}
              >
                {localFilterCollection}
                {collections.map((item) => (
                  <option
                    key={item}
                    selected={item === localFilterCollection ? true : false}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div>{formElements.current.filterCollection}</div>
              <div>{localFilterCollection}</div>
              <div>{collectionState.queryInput.filterCollection}</div>
            </label>
            {/* </form> */}
            <label className="queryCollection__label">
              {"Filter field "}
              <select
                name="filter_field"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalFilterField(
                    (presentForm.elements[1] as HTMLFormElement).value
                  );
                  setLocalFilterValue(
                    queryInputDefault(
                      (presentForm.elements[0] as HTMLFormElement).value
                    ).filterValue
                  );

                  changeFilterFieldQueryInput.current = {
                    filterCollection: (
                      presentForm.elements[0] as HTMLFormElement
                    ).value,
                    filterField: (presentForm.elements[1] as HTMLFormElement)
                      .value,
                    filterValue: "",

                    // As agreed with the backend, the '(select all)' values for filters should be requested as ''
                    searchField: (presentForm.elements[3] as HTMLFormElement)
                      .value,
                    searchType: (presentForm.elements[4] as HTMLFormElement)
                      .value,
                    searchValue: (presentForm.elements[5] as HTMLFormElement)
                      .value,

                    orderField: (presentForm.elements[6] as HTMLFormElement)
                      .value,
                    orderType: (presentForm.elements[7] as HTMLFormElement)
                      .value,
                    queryRecordsPerSet: (
                      presentForm.elements[8] as HTMLFormElement
                    ).value,
                    querySet: (presentForm.elements[9] as HTMLFormElement)
                      .value,
                    primaryKey: "",
                    primaryKeyValue: "",
                  };
                  booleanChangeFilterFieldQueryInput.current = true;

                  updateQueryFields(
                    "componentFile_" + componentFile + "_line_415"
                  );
                }}
              >
                {localFilterField}
                {collectionFilterableFields.map((item) => (
                  <option
                    key={"filter_" + item}
                    selected={item === localFilterField ? true : false}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div>{formElements.current.filterField}</div>
              <div>{localFilterField}</div>
              <div>{collectionState.queryInput.filterField}</div>
            </label>
            <label className="queryCollection__label">
              {"Filter value "}
              <select
                name="filter_value"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalFilterField(
                    (presentForm.elements[1] as HTMLFormElement).value
                  );
                  setLocalFilterValue(
                    (presentForm.elements[2] as HTMLFormElement).value
                  );
                }}
              >
                {localFilterValue}
                {filterValueOptionsShownWithSelectAllAndOrdered.map(
                  (item: string) => (
                    <option
                      key={item}
                      selected={item === localFilterValue ? true : false}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>
              <div>{formElements.current.filterValue}</div>
              <div>{localFilterValue}</div>
              <div>{collectionState.queryInput.filterValue}</div>
            </label>
            <label className="queryCollection__label">
              {"Search field "}
              <select
                name="search_field"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );

                  setLocalSearchField(
                    (presentForm.elements[3] as HTMLFormElement).value
                  );
                }}
              >
                {localSearchField}
                {collectionSearchableFields.map((item) => (
                  <option
                    key={"search_" + item}
                    selected={item === localSearchField ? true : false}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div>{formElements.current.searchField}</div>
              <div>{localSearchField}</div>
              <div>{collectionState.queryInput.searchField}</div>
            </label>
            <label className="queryCollection__label">
              {"Search type "}
              <select
                name="search_type"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalSearchType(
                    (presentForm.elements[4] as HTMLFormElement).value
                  );
                }}
              >
                {localSearchType}
                {searchTypeOptions.map((item) => (
                  <option
                    key={"searchType_" + item}
                    selected={item === localSearchType ? true : false}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div>{formElements.current.searchType}</div>
              <div>{localSearchType}</div>
              <div>{collectionState.queryInput.searchType}</div>
            </label>
            <label className="queryCollection__label">
              {"Search value (case sensitive)"}
              <input
                name="search_value"
                value={localSearchValue}
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalSearchValue(
                    (presentForm.elements[5] as HTMLFormElement).value
                  );
                }}
              ></input>
              <div>{formElements.current.searchValue.toString()}</div>
              <div>{localSearchValue.toString()}</div>
              <div>{collectionState.queryInput.searchValue.toString()}</div>
            </label>

            <label className="queryCollection__label">
              {"Order by "}
              <select
                name="order_field"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalOrderField(
                    (presentForm.elements[6] as HTMLFormElement).value
                  );
                }}
              >
                {localOrderField}
                {collectionOrderableFields.map((item) => (
                  <option
                    key={"order_" + item}
                    selected={item === localOrderField ? true : false}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div>{formElements.current.orderField}</div>
              <div>{localOrderField}</div>
              <div>{collectionState.queryInput.orderField}</div>
            </label>
            <label className="queryCollection__label">
              {"Order type "}
              <select
                name="order_type"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalOrderType(
                    (presentForm.elements[7] as HTMLFormElement).value
                  );
                }}
              >
                {collectionState.queryInput.orderType}

                <option key={"asc"} selected={localOrderType === "asc"}>
                  {"asc"}
                </option>
                <option key={"desc"} selected={localOrderType === "desc"}>
                  {"desc"}
                </option>
              </select>
              <div>{formElements.current.orderType}</div>
              <div>{localOrderType}</div>
              <div>{collectionState.queryInput.orderType}</div>
            </label>
            <label className="queryCollection__label">
              {"Docs/page "}
              <select
                name="queryrecordsperset"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalRecordsPerSet(
                    (presentForm.elements[8] as HTMLFormElement).value
                  );
                }}
              >
                {localRecordsPerSet}
                {recordsPerSet.map((item) => (
                  <option
                    key={item}
                    selected={item === localRecordsPerSet ? true : false}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div>{formElements.current.queryRecordsPerSet}</div>
              <div>{localRecordsPerSet}</div>
              <div>{collectionState.queryInput.queryRecordsPerSet}</div>
            </label>
            <label className="queryCollection__label">
              {"Go to Page# "}
              <select
                name="pageshown"
                onChange={() => {
                  const presentForm = (document.querySelector(
                    "form"
                  ) as HTMLFormElement) ?? (
                    <form>
                      <select>123</select>
                    </form>
                  );
                  setLocalPageShown(
                    (presentForm.elements[9] as HTMLFormElement).value
                  );
                }}
              >
                {pagesArray.map((item) => (
                  <option
                    key={item}
                    selected={item === localPageShown ? true : false}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div>{formElements.current.querySet}</div>
              <div>{localPageShown}</div>
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
          </div>
        </div>
      </div>
    </>
  );
}
