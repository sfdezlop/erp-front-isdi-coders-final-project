//Collection documents types and samples

export type AppCollectionFieldStructure = {
  id: string;
  collectionName: string;
  fieldName: string;
  fieldType: string;
  fieldShortDescription: string;
  filterable: boolean;
  searchable: boolean;
  orderable: boolean;
  htmlTag: string;
  mongoType: string;
  createShow: string;
  detailShow: string;
  galleryShow: string;
  updateShow: string;
  relatedCollectionField: string;
};
export type ProductMovementStructure = {
  id: string;
  productSku: string;
  batch: string;
  date: string;
  type: string;
  typeId: string;
  store: string;
  units: number;
  costPerUnit: number;
  pricePerUnit: number;
};
export type ProductStructure = {
  id: string;
  sku: string;
  shortDescription: string;
  longDescription: string;
  ean: string;
  brand: string;
  image: string;
  userCreatorEmail: string;
  costPerUnit: number;
  pricePerUnit: number;
};

export type TranslationOutputTextStructure = {
  isoCode: string;
  outputText: string;
};

export type TranslationStructure = {
  id: string;
  inputText: string;
  outputTexts: TranslationOutputTextStructure[];
};

export type UserStructure = {
  id: string;
  email: string;
  passwd: string;
  firstName: string;
  lastName: string;
  role: string;
  image: string;
  lastLogging: string;
  language: string;
};

export type CollectionStructure = ProductStructure &
  ProductMovementStructure &
  UserStructure;

// CollectionState Types:

export type QueryFieldsCollectionStructure = {
  collections: string[];
  filterableFields: string[];
  searchableFields: string[];
  orderableFields: string[];
};
export type QueryInputCollectionStructure = {
  filterCollection: string;
  filterField: string;
  filterValue: string;
  searchField: string;
  searchValue: string;
  searchType: string;
  //Options to use in the app: "Begins with" | "Contains" | "Ends with" | "Exact match"
  querySet: number;
  queryRecordsPerSet: number;
  orderField: string;
  orderType: string;
  //Options to use in the app: "asc" | "desc"
  primaryKey: string;
  primaryKeyValue: string;
};

export type QueryOutputCollectionStructure = {
  filterValueOptionsShown: string[];
  pageShown: number;
  queriedCount: number;
  unQueriedCount: number;
  gallery: Partial<CollectionStructure>[];
  galleryInterface: string;
  detail: Partial<CollectionStructure>[];
  detailInterface: string;
};

//UseCollection hook parameter types:

export type ReadQueryCollectionStructure = {
  filterCollection: string;
  filterField: string;
  filterValue: string;
  searchField: string;
  searchValue: string;
  searchType: string;
  //Options to use in the app: "Begins with" | "Contains" | "Ends with" | "Exact match"
  querySet: number;
  queryRecordsPerSet: number;
  orderField: string;
  orderType: string;
  //Options to use in the app: "asc" | "desc"
  primaryKey: string;
  primaryKeyValue: string | number;
};

export type GroupByQueryCollectionStructure = {
  filterCollection: string;
  firstGroupByField: string;
  secondGroupByField: string;
  searchField: string;
  searchValue: string;
  searchType: string;
  //Options to use in the app: "Begins with" | "Contains" | "Ends with" | "Exact match"
  aggregateSumField: string;
};

export type GroupBySetQueryCollectionStructure = {
  filterCollection: string;
  groupByField: string;
};
