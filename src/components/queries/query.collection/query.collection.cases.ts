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
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[1],
        orderField: "galleryShow",
        orderType: "asc",
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
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        orderField: "brandName",
        orderType: "asc",
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
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[1],
        orderField: "date",
        orderType: "desc",
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
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        orderField: "ean",
        orderType: "asc",
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
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        orderField: "inputText",
        orderType: "asc",
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
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[1],
        orderField: "lastLogging",
        orderType: "desc",
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
        querySet: 1,
        queryRecordsPerSet: recordsPerSet[0],
        orderField: "tbd",
        orderType: "asc",
        showType: "gallery",
        showFormat: "raw",
      };
  }
}
