import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProductMovements } from "../../../hooks/use.productmovements";
import { ProductMovementsRepo } from "../../../services/repositories/productmovement.repo";
import { RootState } from "../../../store/store";
import "./query.productmovements.css";

export function FilterProductMovements() {
  const navigate = useNavigate();

  const repo = new ProductMovementsRepo();
  const { filter, paginate } = useProductMovements(repo);
  const filterOptionsArray = [
    ...useSelector(
      (state: RootState) => state.productMovementState.filterOptions
    ),
  ];

  filterOptionsArray.push("(select all)");
  const filterOptionsArrayWithAllAndOrdered = filterOptionsArray.sort();

  const filterValueDefault = useSelector(
    (state: RootState) => state.productMovementState.filter.filterValue
  );

  const orderFieldDefault = useSelector(
    (state: RootState) => state.productMovementState.filter.orderField
  );

  const orderTypeDefault = useSelector(
    (state: RootState) => state.productMovementState.filter.orderType
  );

  const filterRecordsPerSetDefault = useSelector(
    (state: RootState) => state.productMovementState.filter.filterRecordsPerSet
  );

  const pageDefault = useSelector(
    (state: RootState) => state.productMovementState.filteredPage
  );

  const filteredGalleryArray = useSelector(
    (state: RootState) => state.productMovementState.filteredGallery
  );

  const orderByFieldsDefault = [
    "productSku",
    "batch",
    "date",
    "store",
    "units",
  ];
  const orderByFields =
    filteredGalleryArray[0] === undefined
      ? orderByFieldsDefault
      : Object.keys(filteredGalleryArray[0]).sort();
  const recordsPerSetArray = [5, 10, 20, 40, 80, 160, 320];

  const thisUrl = useSelector((state: RootState) => state.appState.urlPage);

  const handlerFilterSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formFilter = event.currentTarget;

    const filterData = {
      filterField: "type",
      filterValue: (formFilter.elements[0] as HTMLFormElement).value,
      filterSet: 1,
      orderField: (formFilter.elements[1] as HTMLFormElement).value,
      orderType: (formFilter.elements[2] as HTMLFormElement).value,
      filterRecordsPerSet: (formFilter.elements[3] as HTMLFormElement).value,
    };

    filter(filterData);
    paginate(1);
    navigate(thisUrl);
  };

  const filteredCountData = useSelector(
    (state: RootState) => state.productMovementState.filteredCount
  );
  const unFilteredCountData = useSelector(
    (state: RootState) => state.productMovementState.unfilteredCount
  );

  const maximumPages =
    Math.floor(filteredCountData / filterRecordsPerSetDefault) ===
    filteredCountData / filterRecordsPerSetDefault
      ? Math.floor(filteredCountData / filterRecordsPerSetDefault)
      : Math.floor(filteredCountData / filterRecordsPerSetDefault) + 1;

  const pagesArray = [];
  for (let i = 1; i <= maximumPages; i++) {
    pagesArray.push(i);
  }

  const handlerPaginationSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formPagination = event.currentTarget;

    const paginationData = (formPagination.elements[0] as HTMLFormElement)
      .value;

    const formFilter = document.forms[0];

    const filterData = {
      filterField: "type",
      filterValue: (formFilter.elements[0] as HTMLFormElement).value,
      filterSet: paginationData,
      orderField: (formFilter.elements[1] as HTMLFormElement).value,
      orderType: (formFilter.elements[2] as HTMLFormElement).value,
      filterRecordsPerSet: (formFilter.elements[3] as HTMLFormElement).value,
    };

    paginate(paginationData);
    filter(filterData);
    navigate(thisUrl);
  };

  return (
    <>
      <div className="filterProductMovements_forms">
        <div>
          <form
            className="filterProductMovements__form"
            onSubmit={handlerFilterSubmit}
            onChange={handlerFilterSubmit}
          >
            <label>Select a movement type:</label>
            <select
              className="filterProductMovements__selectField"
              defaultValue={filterValueDefault}
            >
              {filterValueDefault}
              {filterOptionsArrayWithAllAndOrdered.map((item: string) => (
                <option className="filterProductMovements__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            <label>Order by:</label>
            <select
              className="filterProductMovements__orderByField"
              defaultValue={orderFieldDefault}
            >
              {orderFieldDefault}
              {orderByFields.map((item) => (
                <option className="filterProductMovements__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            <label>Order type:</label>
            <select
              className="filterProductMovements__orderType"
              defaultValue={orderTypeDefault}
            >
              {orderTypeDefault}

              <option
                className="filterProductMovementsOrderType__option"
                key={"asc"}
              >
                {"asc"}
              </option>
              <option
                className="filterProductMovementsOrderType__option"
                key={"desc"}
              >
                {"desc"}
              </option>
            </select>
            <label>Records to show per page:</label>
            <select
              className="filterProductMovements__recordsPerSet"
              defaultValue={filterRecordsPerSetDefault}
            >
              {filterRecordsPerSetDefault}
              {recordsPerSetArray.map((item) => (
                <option className="filterProductMovements__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            {/* <button className="filter__button">Filter</button> */}
          </form>
        </div>
        <div>
          <form
            className="filterProductMovementsPagination__form"
            onSubmit={handlerPaginationSubmit}
            onChange={handlerPaginationSubmit}
          >
            <p>Unfiltered records: {unFilteredCountData}</p>
            <p>Filtered records: {filteredCountData}</p>

            <p>Available pages: {maximumPages}</p>
            <p>Page shown: {pageDefault}</p>
            <select
              className="filterProductMovementsPagination__pages"
              defaultValue={pageDefault}
            >
              {pageDefault}
              {pagesArray.map((item) => (
                <option className="filterProductMovements__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            {/* <button className="filter__button">Go to page#</button> */}
          </form>
        </div>
      </div>
    </>
  );
}
