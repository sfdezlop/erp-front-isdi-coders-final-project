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
