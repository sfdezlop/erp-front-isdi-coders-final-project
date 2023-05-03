import { SyntheticEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import "./query.collection.css";
import { collectionFields, collections } from "../../models/collections.model";
import { CollectionsRepo } from "../../services/repositories/collection.repo";
import { useCollections } from "../../hooks/use.collections";

export type QueryCollectionProps = {
  collectionName: string;
};
export function QueryCollection({ collectionName }: QueryCollectionProps) {
  const collectionState = useSelector(
    (state: RootState) => state.collectionState
  );

  const filterValueOptionsShown = [
    ...collectionState.queryOutput.filterValueOptionsShown,
  ];

  filterValueOptionsShown.push("(select all)");
  const filterValueOptionsShownWithSelectAllAndOrdered =
    filterValueOptionsShown.sort();

  const recordsPerSet = [4, 8, 16, 32, 64, 128, 256];
  const collectionFieldsToFilterBy = collectionFields.filter(
    (item) => item.collection === collectionState.queryInput.filterCollection

    //collectionName
  );

  const collectionFieldsToSearchBy = collectionFields.filter(
    (item) => item.collection === collectionState.queryInput.filterCollection

    //collectionName
  );

  const collectionFieldsToOrderBy = collectionFields.filter(
    (item) => item.collection === collectionState.queryInput.filterCollection

    //collectionName
  );

  const thisUrl = useSelector((state: RootState) => state.appState.urlPage);
  const repoCollection = new CollectionsRepo();
  const { updateQueryInput, updateQueryOutput } =
    useCollections(repoCollection);
  const navigate = useNavigate();
  const handlerOnChange = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryForm = event.currentTarget;

    const queryInputObject = {
      filterCollection: (queryForm.elements[0] as HTMLFormElement).value,
      filterField: (queryForm.elements[1] as HTMLFormElement).value,
      filterValue: (queryForm.elements[2] as HTMLFormElement).value,
      searchField: (queryForm.elements[3] as HTMLFormElement).value,
      searchValue: (queryForm.elements[4] as HTMLFormElement).value,
      filterSet: 1,
      filterRecordsPerSet: (queryForm.elements[5] as HTMLFormElement).value,
      orderField: (queryForm.elements[6] as HTMLFormElement).value,
      orderType: (queryForm.elements[7] as HTMLFormElement).value,
      primaryKey: "",
      primaryKeyValue: "",
    };
    updateQueryInput(queryInputObject);
    // paginate(1);
    navigate(thisUrl);
  };

  const maximumPages =
    collectionState.queryInput.filterRecordsPerSet === undefined
      ? 1
      : Math.floor(
          collectionState.queryOutput.queriedCount /
            collectionState.queryInput.filterRecordsPerSet
        ) <
        collectionState.queryOutput.queriedCount /
          collectionState.queryInput.filterRecordsPerSet
      ? Math.floor(
          collectionState.queryOutput.queriedCount /
            collectionState.queryInput.filterRecordsPerSet
        )
      : Math.floor(
          collectionState.queryOutput.queriedCount /
            collectionState.queryInput.filterRecordsPerSet
        ) + 1;

  const pagesArray: number[] = [1];
  for (let i = 2; i <= maximumPages + 1; i++) {
    pagesArray.push(i);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionState]);

  return (
    <>
      <div className="queryCollection__container">
        <div>
          <form
            className="queryCollection__formContainer"
            onChange={handlerOnChange}
          >
            <label className="queryCollection__label">
              {"Data collection "}
              <select
                name="collection"
                defaultValue={collectionState.queryInput.filterCollection}
              >
                {collectionState.queryInput.filterCollection}
                {collections.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="queryCollection__label">
              {"Filter field "}
              <select
                name="filter field"
                defaultValue={collectionState.queryInput.filterValue}
              >
                {collectionState.queryInput.filterValue}
                {collectionFieldsToFilterBy.map((item) => (
                  <option key={"filter_" + item.collection + "_" + item.field}>
                    {item.field}
                  </option>
                ))}
              </select>
            </label>
            <label className="queryCollection__label">
              {"Filter value "}
              <select
                name="filter value"
                defaultValue={collectionState.queryInput.filterValue}
              >
                {collectionState.queryInput.filterValue}
                {filterValueOptionsShownWithSelectAllAndOrdered.map(
                  (item: string) => (
                    <option key={item}>{item}</option>
                  )
                )}
              </select>
            </label>
            <label className="queryCollection__label">
              {"Search field "}
              <select
                name="search field"
                defaultValue={collectionState.queryInput.filterValue}
              >
                {collectionState.queryInput.filterValue}
                {collectionFieldsToSearchBy.map((item) => (
                  <option key={"search_" + item.collection + "_" + item.field}>
                    {item.field}
                  </option>
                ))}
              </select>
            </label>
            <label className="queryCollection__label">
              {"Search value "}
              <input
                name="search value"
                defaultValue={collectionState.queryInput.searchValue}
              ></input>
            </label>
            <label className="queryCollection__label">
              {"Order by "}
              <select defaultValue={collectionState.queryInput.orderField}>
                {collectionState.queryInput.orderField}
                {collectionFieldsToOrderBy.map((item) => (
                  <option key={"order" + item.collection + "_" + item.field}>
                    {item.field}
                  </option>
                ))}
              </select>
            </label>
            <label className="queryCollection__label">
              {"Order type "}
              <select defaultValue={collectionState.queryInput.orderType}>
                {collectionState.queryInput.orderType}

                <option key={"asc"}>{"asc"}</option>
                <option key={"desc"}>{"desc"}</option>
              </select>
            </label>
            <label className="queryCollection__label">
              {"Records per page "}
              <select
                defaultValue={collectionState.queryInput.filterRecordsPerSet}
              >
                {collectionState.queryInput.filterRecordsPerSet}
                {recordsPerSet.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="queryCollection__label">
              {"Go to Page# "}
              <select defaultValue={collectionState.queryOutput.pageShown}>
                {collectionState.queryOutput.pageShown}
                {pagesArray.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </form>
        </div>
        <div>
          <div className="queryCollection__paginationContainer">
            <div>
              {"Unfiltered records: " +
                collectionState.queryOutput.unQueriedCount}
            </div>
            <div>
              {"Filtered records: " + collectionState.queryOutput.queriedCount}
            </div>
            <div>{"Available pages: " + maximumPages + 1}</div>
            <div>{"Page shown: " + collectionState.queryOutput.pageShown}</div>
          </div>
        </div>
      </div>
    </>
  );
}
