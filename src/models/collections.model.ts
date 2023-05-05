export const collections = ["products", "productmovements", "users"];

export type CollectionNameStructure = "products" | "productmovements" | "users";

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

export const productStructureSample: ProductStructure = {
  id: "id",
  sku: "Sku",
  shortDescription: "Short Description",
  longDescription: "Long Description",
  ean: "EAN",
  brand: "Brand",
  image: "Image",
  userCreatorEmail: "User Creator Email",
  costPerUnit: 0,
  pricePerUnit: 0,
};
const productStructureFields = Object.keys(productStructureSample);
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

export const productMovementStructureSample: ProductMovementStructure = {
  id: "id",
  productSku: "SKU",
  batch: "Batch",
  date: "Date of the product movement",
  type: "Type of product movement",
  typeId: "Id of type of product movement",
  store: "Store",
  units: 0,
  costPerUnit: 0,
  pricePerUnit: 0,
};
const productMovementStructureFields = Object.keys(
  productMovementStructureSample
);
export type UserStructure = {
  id: string;
  email: string;
  passwd: string;
  firstName: string;
  lastName: string;
  role: string;
  image: string;
  lastLogging: string;
};

export const userStructureSample: UserStructure = {
  id: "id",
  email: "email",
  passwd: "Password",
  firstName: "First Name",
  lastName: "Last Name",
  role: "Role",
  image: "Image url",
  lastLogging: "Last logging",
};

const userStructureFields = Object.keys(userStructureSample);

const collectionFieldsCreator = () => {
  let collectionFields = [{ collection: "", field: "" }];
  collectionFields.shift();
  productStructureFields.forEach((element) =>
    collectionFields.push({ collection: "products", field: element })
  );
  productMovementStructureFields.forEach((element) =>
    collectionFields.push({ collection: "productmovements", field: element })
  );
  userStructureFields.forEach((element) =>
    collectionFields.push({ collection: "users", field: element })
  );
  return collectionFields;
};

export const collectionFields = collectionFieldsCreator();

export type CollectionStructure = ProductStructure &
  ProductMovementStructure &
  UserStructure;
export type QueryInputCollectionStructure = {
  filterCollection: CollectionNameStructure;
  filterField?: string;
  filterValue?: string;
  searchField?: string;
  searchValue?: string;
  searchType?: "Begins with" | "Contains" | "Ends with" | "Exact match";
  querySet?: number;
  queryRecordsPerSet?: number;
  orderField?: string;
  orderType?: "asc" | "desc";
  primaryKey: string;
  primaryKeyValue: string | number;
};

export type QueryOutputCollectionStructure = {
  filterValueOptionsShown: string[];
  pageShown: number;
  queriedCount: number;
  unQueriedCount: number;
  gallery: Partial<CollectionStructure>[];
  detail: Partial<CollectionStructure>[];
};

export type GroupCollectionStructure = {
  filterField?: string;
};