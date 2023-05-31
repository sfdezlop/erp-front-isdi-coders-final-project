import { QueryInputCollectionStructure } from "../../models/collections.model";

export const accumulateValueOfAnArrayOfNumbers = (a: number[]) => {
  //Parameter a is the array
  let result = a.reduce((c: any, d: any) => c + d, 0);
  //Initial value of the callback to avoid 'Reduce of empty array with no initial value errors
  return result;
};

export const americanLargeFormatOfADate = (a: Date): string => {
  const year = a.getFullYear();
  let month,
    day,
    hour,
    minute,
    second = "";
  const dateSeparator = "-";
  const timeSeparator = ":";
  if (Number(a.getMonth() + 1) < 10) {
    month = "0" + Number(a.getMonth() + 1);
  } else {
    month = "" + Number(a.getMonth() + 1);
  }
  if (a.getDate() < 10) {
    day = "0" + a.getDate();
  } else {
    day = "" + a.getDate();
  }
  if (a.getHours() < 10) {
    hour = "0" + a.getHours();
  } else {
    hour = "" + a.getHours();
  }
  if (a.getMinutes() < 10) {
    minute = "0" + a.getMinutes();
  } else {
    minute = "" + a.getMinutes();
  }
  if (a.getSeconds() < 10) {
    second = "0" + a.getSeconds();
  } else {
    second = "" + a.getSeconds();
  }
  const result =
    year +
    dateSeparator +
    month +
    dateSeparator +
    day +
    " " +
    hour +
    timeSeparator +
    minute +
    timeSeparator +
    second +
    "." +
    a.getMilliseconds();
  return result;
};

export const americanShortFormatOfADate = (a: Date): string => {
  const year = a.getFullYear();
  let month,
    day = "";
  const dateSeparator = "-";
  if (Number(a.getMonth() + 1) < 10) {
    month = "0" + Number(a.getMonth() + 1);
  } else {
    month = "" + Number(a.getMonth() + 1);
  }
  if (a.getDate() < 10) {
    day = "0" + a.getDate();
  } else {
    day = "" + a.getDate();
  }

  const result = year + dateSeparator + month + dateSeparator + day;
  return result;
};

export const maximumValueOfAPropertyInAnArrayOfObjects = (a: [], b: string) => {
  // Parameter a is the array of object
  // Parameter b is the name of property in which you want to calculate the maximum value between all de objects of the array
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    if (result < a[i][b]) {
      // It doest work is you use the typical a[i].b syntax to refer to properties because the function need to evaluate b
      result = a[i][b];
    }
  }
  return result;
};
export const orderByPropertyAnArrayOfObjects = (
  a: [],
  b: string,
  c: string
) => {
  // Parameter a is the array to order
  // Parameter b is the property to order by
  // Parameter c is the type of order ("asc" or "desc")
  const result = a.sort((item1, item2) => {
    if (c === "desc") {
      if (item1[b] === item2[b]) {
        return 0;
      }
      if (item1[b] < item2[b]) {
        return 1;
      }
      return -1;
    } else {
      if (item1[b] === item2[b]) {
        return 0;
      }
      if (item1[b] > item2[b]) {
        return 1;
      }
      return -1;
    }
  });
  return result;
};

export const roundToDecimals = (a: number, b: number) => {
  // This function has the same behavior as round(a,b) in MS Excel
  // Parameter a is the number to round
  // Parameter b is the quantity of decimals you want to round

  const ax10PowerOfB = a * Math.pow(10, b);

  return Math.round(ax10PowerOfB) / Math.pow(10, b);
};

export const navigationURIToQueryPage = (
  queryInput: QueryInputCollectionStructure
) => {
  const result = encodeURI(
    "/collections/readrecords/&collection=" +
      queryInput.filterCollection +
      "&filterfield=" +
      queryInput.filterField +
      "&filtervalue=" +
      queryInput.filterValue +
      "&searchfield=" +
      queryInput.searchField +
      "&searchvalue=" +
      queryInput.searchValue +
      "&searchtype=" +
      queryInput.searchType +
      "&orderfield=" +
      queryInput.orderField +
      "&ordertype=" +
      queryInput.orderType +
      "&queryset=" +
      queryInput.querySet +
      "&queryrecordsperset=" +
      queryInput.queryRecordsPerSet +
      "&showtype=" +
      queryInput.showType +
      "&showformat=" +
      queryInput.showFormat +
      "&controlinfo="
  );

  return result;
};

export const queryInputForANavigationURI = (
  navigationURI: string
): QueryInputCollectionStructure => {
  const decodedNavigationURI = decodeURI(navigationURI);

  const result: QueryInputCollectionStructure = {
    filterCollection: decodedNavigationURI
      .split("&collection=")[1]
      .split("&filterfield=")[0],
    filterField: decodedNavigationURI
      .split("&filterfield=")[1]
      .split("&filtervalue=")[0],
    filterValue: decodedNavigationURI
      .split("&filtervalue=")[1]
      .split("&searchfield=")[0],
    searchField: decodedNavigationURI
      .split("&searchfield=")[1]
      .split("&searchvalue=")[0],
    searchValue: decodedNavigationURI
      .split("&searchvalue=")[1]
      .split("&searchtype=")[0],
    searchType: decodedNavigationURI
      .split("&searchtype=")[1]
      .split("&orderfield=")[0],
    orderField: decodedNavigationURI
      .split("&orderfield=")[1]
      .split("&ordertype=")[0],
    orderType: decodedNavigationURI
      .split("&ordertype=")[1]
      .split("&queryset=")[0],
    querySet: Number(
      decodedNavigationURI
        .split("&queryset=")[1]
        .split("&queryrecordsperset=")[0]
    ),
    queryRecordsPerSet: Number(
      decodedNavigationURI
        .split("&queryrecordsperset=")[1]
        .split("&showtype=")[0]
    ),
    showType: decodedNavigationURI
      .split("&showtype=")[1]
      .split("&showformat=")[0],
    showFormat: decodedNavigationURI
      .split("&showformat=")[1]
      .split("&controlinfo=")[0],
  };

  return result;
};
