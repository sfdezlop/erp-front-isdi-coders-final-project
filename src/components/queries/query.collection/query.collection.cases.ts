import { recordsPerSet } from "../../../reducers/collection.slice";

export function queryInputOnChangeCollection(collection: string) {
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
        primaryKey: "",
        primaryKeyValue: "",
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
        primaryKey: "",
        primaryKeyValue: "",
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
        primaryKey: "",
        primaryKeyValue: "",
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
        primaryKey: "",
        primaryKeyValue: "",
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
        primaryKey: "",
        primaryKeyValue: "",
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
        primaryKey: "",
        primaryKeyValue: "",
      };
  }
}
