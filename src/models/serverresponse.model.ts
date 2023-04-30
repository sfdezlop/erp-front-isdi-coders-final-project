export type ProductServerResponseType = {
  results: [];
};

export type ProductMovementServerResponseType = {
  results: [];
};

export type UserServerResponseType = {
  results: [string, object, []];
};

export type StockServerResponseType = {
  results: { _id: string; stock: number }[];
};

export type StoreLogServerResponseType = {
  results: [];
};

export type ProductDetailServerResponseType = {
  results: { key: string; value: string }[];
};
