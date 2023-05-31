import { QueryInputCollectionStructure } from "../../../models/collections.model";
import { recordsPerSet } from "../../../reducers/collection.slice";

export function queryInputOnChangeCollection(
  collection: string
): QueryInputCollectionStructure {
  switch (collection) {
    case "appcollectionfields":
      return {
        filterCollection: "appcollectionfields",
        filterField: "collectionName",
        filterValue: "",
        searchField: "fieldName",
        searchValue: "",
        searchType: "Contains",
        orderField: "galleryShow",
        orderType: "asc",
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[1],
        showType: "gallery",
        showFormat: "raw",
      };
    case "brands":
      return {
        filterCollection: "brands",
        filterField: "brandName",
        filterValue: "",
        searchField: "brandName",
        searchValue: "",
        searchType: "Contains",
        orderField: "brandName",
        orderType: "asc",
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        showType: "gallery",
        showFormat: "raw",
      };
    case "productmovements":
      return {
        filterCollection: "productmovements",
        filterField: "type",
        filterValue: "",
        searchField: "batch",
        searchValue: "",
        searchType: "Contains",
        orderField: "date",
        orderType: "desc",
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[1],
        showType: "gallery",
        showFormat: "raw",
      };
    case "products":
      return {
        filterCollection: "products",
        filterField: "brand",
        filterValue: "",
        searchField: "sku",
        searchValue: "",
        searchType: "Contains",
        orderField: "ean",
        orderType: "asc",
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        showType: "gallery",
        showFormat: "raw",
      };
    case "translations":
      return {
        filterCollection: "translations",
        filterField: "inputText",
        filterValue: "",
        searchField: "inputText",
        searchValue: "",
        searchType: "Contains",
        orderField: "inputText",
        orderType: "asc",
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        showType: "gallery",
        showFormat: "raw",
      };
    case "users":
      return {
        filterCollection: "users",
        filterField: "role",
        filterValue: "",
        searchField: "lastName",
        searchValue: "",
        searchType: "Contains",
        orderField: "lastLogging",
        orderType: "desc",
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[1],
        showType: "gallery",
        showFormat: "raw",
      };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return {
        filterCollection: "toBeDefined",
        filterField: "tbd",
        filterValue: "",
        searchField: "tbd",
        searchValue: "",
        searchType: "Contains",
        orderField: "tbd",
        orderType: "asc",
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        showType: "gallery",
        showFormat: "raw",
      };
  }
}
