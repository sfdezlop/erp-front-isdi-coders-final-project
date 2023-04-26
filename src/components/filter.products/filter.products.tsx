import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/use.products";
import { ProductsRepo } from "../../services/repositories/product.repo";
import { RootState } from "../../store/store";
import "./filter.products.css";

export function FilterProducts() {
  const navigate = useNavigate();

  const repoProduct = new ProductsRepo();
  const { filterProducts, paginateProducts } = useProducts(repoProduct);
  const filterOptionsArray = [
    ...useSelector((state: RootState) => state.productState.filterOptions),
  ];

  filterOptionsArray.push("(select all)");
  const filterOptionsArrayWithAllAndOrdered = filterOptionsArray.sort();

  const filterValueDefault = useSelector(
    (state: RootState) => state.productState.filter.filterValue
  );

  const orderFieldDefault = useSelector(
    (state: RootState) => state.productState.filter.orderField
  );

  const orderTypeDefault = useSelector(
    (state: RootState) => state.productState.filter.orderType
  );

  const filterRecordsPerSetDefault = useSelector(
    (state: RootState) => state.productState.filter.filterRecordsPerSet
  );

  const pageDefault = useSelector(
    (state: RootState) => state.productState.filteredPage
  );

  const filteredGalleryArray = useSelector(
    (state: RootState) => state.productState.filteredGallery
  );

  const orderByFieldsDefault = [
    "brand",
    "ean",
    "id",
    "shortDescription",
    "sku",
  ];
  const orderByFields =
    filteredGalleryArray[0] === undefined
      ? orderByFieldsDefault
      : Object.keys(filteredGalleryArray[0]).sort();
  const recordsPerSetArray = [4, 8, 16, 32, 64, 128, 256];

  const handlerFilterSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formFilter = event.currentTarget;

    const filterData = {
      filterField: "brand",
      filterValue: (formFilter.elements[0] as HTMLFormElement).value,
      filterSet: 1,
      orderField: (formFilter.elements[1] as HTMLFormElement).value,
      orderType: (formFilter.elements[2] as HTMLFormElement).value,
      filterRecordsPerSet: (formFilter.elements[3] as HTMLFormElement).value,
    };

    filterProducts(filterData);
    paginateProducts(1);

    navigate("/products");
  };

  const filteredCountData = useSelector(
    (state: RootState) => state.productState.filteredCount
  );

  const unFilteredCountData = useSelector(
    (state: RootState) => state.productState.unFilteredCount
  );

  const maximumPages =
    Math.floor(filteredCountData / filterRecordsPerSetDefault) <
    filteredCountData / filterRecordsPerSetDefault
      ? Math.floor(filteredCountData / filterRecordsPerSetDefault)
      : Math.floor(filteredCountData / filterRecordsPerSetDefault) + 1;

  const pagesArray = [];
  for (let i = 1; i <= maximumPages + 1; i++) {
    pagesArray.push(i);
  }

  const handlerPaginationSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formPagination = event.currentTarget;

    const paginationData = (formPagination.elements[0] as HTMLFormElement)
      .value;

    const formFilter = document.forms[0];

    const filterData = {
      filterField: "brand",
      filterValue: (formFilter.elements[0] as HTMLFormElement).value,
      filterSet: paginationData,
      orderField: (formFilter.elements[1] as HTMLFormElement).value,
      orderType: (formFilter.elements[2] as HTMLFormElement).value,
      filterRecordsPerSet: (formFilter.elements[3] as HTMLFormElement).value,
    };

    paginateProducts(paginationData);
    filterProducts(filterData);

    navigate("/products");
  };

  return (
    <>
      <div className="filter_forms">
        <div>
          <form
            className="filter__form"
            onSubmit={handlerFilterSubmit}
            onChange={handlerFilterSubmit}
          >
            <label>Select a Brand:</label>
            <select
              name="marcas"
              className="filter__selectField"
              defaultValue={filterValueDefault}
            >
              {filterValueDefault}
              {filterOptionsArrayWithAllAndOrdered.map((item: string) => (
                <option className="filter__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            <label>Order by:</label>
            <select
              className="filter__orderByField"
              defaultValue={orderFieldDefault}
            >
              {orderFieldDefault}
              {orderByFields.map((item) => (
                <option className="filter__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            <label>Order type:</label>
            <select
              className="filter__orderType"
              defaultValue={orderTypeDefault}
            >
              {orderTypeDefault}

              <option className="orderType__option" key={"asc"}>
                {"asc"}
              </option>
              <option className="orderType__option" key={"desc"}>
                {"desc"}
              </option>
            </select>
            <label>Records to show per page:</label>
            <select
              className="filter__recordsPerSet"
              defaultValue={filterRecordsPerSetDefault}
            >
              {filterRecordsPerSetDefault}
              {recordsPerSetArray.map((item) => (
                <option className="filter__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            <button className="filter__button">Filter</button>
          </form>
        </div>
        <div>
          <form
            className="pagination__form"
            onSubmit={handlerPaginationSubmit}
            onChange={handlerPaginationSubmit}
          >
            <p>Unfiltered records: {unFilteredCountData}</p>
            <p>Filtered records: {filteredCountData}</p>
            <p>Available pages: {maximumPages + 1}</p>
            <p>Page shown: {pageDefault}</p>
            <select className="pagination__pages" defaultValue={pageDefault}>
              {pageDefault}
              {pagesArray.map((item) => (
                <option className="filter__option" key={item}>
                  {item}
                </option>
              ))}
            </select>
            <button className="filter__button">Go to page#</button>
          </form>
        </div>
      </div>
    </>
  );
}
