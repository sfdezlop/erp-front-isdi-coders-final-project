import {
  americanLargeFormatOfADate,
  americanShortFormatOfADate,
} from "./functions";

describe("Given the americanLargeFormatOfADate function", () => {
  test("When the input date is AAAA-MM-DDTHH:MM:SS.MSC, then it should return AAAA-MM-DD HH:MM:SS.MSC", () => {
    const date = new Date("2023-09-02T10:04:05.678");
    const expected = "2023-09-02 10:04:05.678";
    const result = americanLargeFormatOfADate(date);
    expect(result).toEqual(expected);
  });
});

describe("Given the americanShortFormatOfADate function", () => {
  test("When the input date is AAAA-MM-DDTHH:MM:SS.MSC, then it should return AAAA-MM-DD", () => {
    const date = new Date("2023-11-12T10:04:05.678");
    const expected = "2023-11-12";
    const result = americanShortFormatOfADate(date);
    expect(result).toEqual(expected);
  });
});
