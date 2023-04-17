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

export type UserServerResponseType = {
  results: [];
};
