import { ProductServerResponseType } from "../../models/product.model";
import { url_def } from "../../config";

type Filter = {
  filterField?: string;
  filterValue?: string;
  filterSet?: number;
  filterRecordsPerSet?: number;
  orderField?: string;
  orderType?: string;
};

export class ProductMovementsRepo {
  url: string;
  constructor() {
    this.url = url_def;
  }

  async readFilteredGallery(
    token: string,
    urlExtraPath: string,
    filter: Filter
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        filterField: filter.filterField,
        filterValue: filter.filterValue,
        filterSet: filter.filterSet,
        filterRecordsPerSet: filter.filterRecordsPerSet,
        orderField: filter.orderField,
      }),

      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading filtered products movements gallery: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readFilteredCount(
    token: string,
    urlExtraPath: string,
    filterFieldReceived: string,
    filterValueReceived: string
  ): Promise<number> {
    const url = this.url + "/" + urlExtraPath;
    let filterObject;
    filterFieldReceived === "" && filterValueReceived === ""
      ? (filterObject = {})
      : (filterObject = {
          filterField: filterFieldReceived,
          filterValue: filterValueReceived,
        });

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ filterObject }),
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading the filtered count of product movements: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readDetail(
    token: string,
    urlExtraPath: string
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/" + urlExtraPath;

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (!resp.ok)
      throw new Error(
        `Error http reading product detail: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readGroupsByField(
    token: string,
    urlExtraPath: string,
    field: string
  ): Promise<ProductServerResponseType> {
    const url = this.url + "/" + urlExtraPath + "/" + field;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading product detail: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }

  async readAnalytics(token: string): Promise<ProductServerResponseType> {
    const url = this.url + "/productmovements/analytics";

    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok)
      throw new Error(
        `Error http reading product detail: ${resp.status} ${resp.statusText}`
      );

    const data = await resp.json();

    return data;
  }
}
